import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Card,
  Button,
  Input,
  Heading,
  Paragraph,
  Badge,
  Tooltip,
  useToast,
} from '../../components/common';

/* ------------------- Storage helpers ------------------- */

const STORAGE_KEY = 'cps-saved-palettes';

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* silent */ }
}

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const fmtDate = (ts) => {
  try {
    return new Date(ts).toLocaleString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit',
    });
  } catch { return ''; }
};

/* ------------------- Sub-components ------------------- */

function Thumbnail({ palette }) {
  const picks = useMemo(() => {
    if (!palette || palette.length === 0) return [];
    const n = palette.length;
    if (n <= 5) return palette;
    return [0, Math.round(n * 0.25), Math.round(n * 0.5), Math.round(n * 0.75), n - 1]
      .map((i) => palette[i]);
  }, [palette]);

  return (
    <div className="flex h-10 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
      {picks.map((s, i) => (
        <div key={i} className="flex-1" style={{ background: s.hex }} title={s.hex} />
      ))}
    </div>
  );
}

function SavedItem({ item, onLoad, onDelete }) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="p-4">
        <Thumbnail palette={item.palette} />
        <div className="mt-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {item.name}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500">
              <Badge variant="outline">{item.baseHex.toUpperCase()}</Badge>
              <span>·</span>
              <span>{fmtDate(item.createdAt)}</span>
            </div>
          </div>
          <span
            className="mt-1 inline-block h-5 w-5 shrink-0 rounded-full ring-2 ring-white dark:ring-neutral-900 shadow"
            style={{ background: item.baseHex }}
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="brand" className="flex-1" onClick={() => onLoad?.(item.baseHex)}>
            Load
          </Button>
          <Tooltip content="Delete this palette">
            <Button size="sm" variant="outline" onClick={() => onDelete?.(item.id)}>
              Delete
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}

/* ------------------- Main modal ------------------- */

export default function SavedLibraryModal({
  open,
  onClose,
  currentPalette = [],
  currentName = '',
  currentBaseHex = '#3b82f6',
  onLoad,
}) {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    if (!open) return;
    setItems(readStore());
    setName(currentName || '');
    setShowImport(false);
    setImportText('');
  }, [open, currentName]);

  const persist = (next) => { setItems(next); writeStore(next); };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return toast('Name is required');
    if (!currentPalette || currentPalette.length === 0) return toast('No palette to save');
    const entry = {
      id: uid(),
      name: trimmed,
      baseHex: currentBaseHex,
      palette: currentPalette,
      createdAt: Date.now(),
    };
    persist([entry, ...items]);
    setName('');
    toast(`Saved "${trimmed}"`);
  };

  const handleDelete = (id) => {
    persist(items.filter((i) => i.id !== id));
    toast('Deleted');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cps-saved-palettes-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast('Exported');
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) throw new Error('Expected array');
      const cleaned = parsed
        .filter((p) => p && typeof p.baseHex === 'string' && Array.isArray(p.palette))
        .map((p) => ({
          id: p.id || uid(),
          name: p.name || 'Imported',
          baseHex: p.baseHex,
          palette: p.palette,
          createdAt: p.createdAt || Date.now(),
        }));
      if (cleaned.length === 0) return toast('No valid palettes found');
      persist([...cleaned, ...items]);
      setImportText('');
      setShowImport(false);
      toast(`Imported ${cleaned.length} palette${cleaned.length === 1 ? '' : 's'}`);
    } catch {
      toast('Invalid JSON');
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="xl" title="Saved Library">
      <div className="flex flex-col gap-4">
        <Card accent>
          <Heading as="h3" accent>Save & manage palettes</Heading>
          <Paragraph size="sm" className="mt-1">
            Palettes are stored locally in your browser. Use export/import to
            move them between machines.
          </Paragraph>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                label="Palette name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                placeholder="e.g. Marketing site v2"
              />
            </div>
            <Button variant="brand" onClick={handleSave}>Save current</Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <Badge variant="outline">
              <span
                className="mr-1 inline-block h-2 w-2 rounded-full"
                style={{ background: currentBaseHex }}
              />
              {currentBaseHex.toUpperCase()}
            </Badge>
            <span>· {currentPalette?.length || 0} shades will be saved</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 dark:border-neutral-800 pt-3">
            <Button variant="outline" size="sm" onClick={handleExport} disabled={items.length === 0}>
              Export all (JSON)
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowImport((s) => !s)}>
              {showImport ? 'Cancel import' : 'Import'}
            </Button>
            <span className="ml-auto text-xs text-neutral-500">{items.length} saved</span>
          </div>

          {showImport && (
            <div className="mt-3 flex flex-col gap-2">
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste exported JSON here..."
                rows={5}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 font-mono text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': 'var(--brand-500)' }}
              />
              <div>
                <Button size="sm" variant="brand" onClick={handleImport}>Import palettes</Button>
              </div>
            </div>
          )}
        </Card>

        {items.length === 0 ? (
          <Card>
            <div className="py-6 text-center">
              <Paragraph size="sm">
                No saved palettes yet. Name your current palette above and hit Save.
              </Paragraph>
            </div>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <SavedItem
                key={item.id}
                item={item}
                onLoad={(hex) => { onLoad?.(hex); toast(`Loaded "${item.name}"`); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
