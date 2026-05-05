import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import Heading from '../../components/common/Heading.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import Badge from '../../components/common/Badge.jsx';
import Tag from '../../components/common/Tag.jsx';
import Tooltip from '../../components/common/Tooltip.jsx';
import Icon from '../../components/common/Icon.jsx';

/**
 * HistoryModal — visual browser for an undo/redo timeline.
 *
 * Props:
 *   - open: boolean
 *   - onClose: () => void
 *   - history: Array<string | { hex?: string, baseHex?: string, label?: string }>
 *   - currentIndex: number
 *   - onJump: (index: number) => void
 *   - onClear?: () => void
 */
export default function HistoryModal({
  open,
  onClose,
  history = [],
  currentIndex = 0,
  onJump,
  onClear,
}) {
  const entries = [...history].map((value, i) => ({
    value,
    hex: extractHex(value),
    label: extractLabel(value, i),
    index: i,
  }));

  // Newest first feels more natural.
  const ordered = entries.slice().reverse();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="History"
      size="lg"
      footer={
        <>
          {onClear && (
            <Button variant="outline" onClick={onClear} disabled={history.length <= 1}>
              <Icon name="close" size={14} /> Clear history
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>Done</Button>
        </>
      }
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <Heading as="h3">Recent palette states</Heading>
          <Paragraph size="sm" className="mt-1">
            Cmd/Ctrl + Z to undo, Cmd/Ctrl + Shift + Z to redo. Click any entry to jump.
          </Paragraph>
        </div>
        <Badge variant="brand">{history.length} step{history.length === 1 ? '' : 's'}</Badge>
      </div>

      {history.length === 0 ? (
        <Card className="text-center">
          <Paragraph size="sm">No history yet — change the base color to start tracking.</Paragraph>
        </Card>
      ) : (
        <ol className="relative space-y-2 pl-6">
          <span
            aria-hidden
            className="absolute left-2 top-2 bottom-2 w-px"
            style={{ background: 'color-mix(in srgb, var(--brand-500) 30%, transparent)' }}
          />
          {ordered.map((entry) => {
            const active = entry.index === currentIndex;
            return (
              <li key={entry.index} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[18px] top-4 h-3 w-3 rounded-full ring-2 ring-white dark:ring-neutral-900"
                  style={{ background: active ? 'var(--brand-500)' : '#a1a1aa' }}
                />
                <HistoryRow entry={entry} active={active} onJump={onJump} />
              </li>
            );
          })}
        </ol>
      )}
    </Modal>
  );
}

function HistoryRow({ entry, active, onJump }) {
  const { hex, label, index } = entry;
  return (
    <Card
      accent={active}
      padded={false}
      className="flex items-center gap-4 p-3"
    >
      <div
        className="h-12 w-12 shrink-0 rounded-xl border border-neutral-200 dark:border-neutral-800"
        style={{ background: hex || 'transparent' }}
        title={hex || 'unknown'}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {hex || '—'}
          </span>
          {active && <Badge variant="brand">Current</Badge>}
          <Tag>#{index}</Tag>
        </div>
        {label && (
          <Paragraph size="sm" className="mt-0.5 truncate">{label}</Paragraph>
        )}
      </div>
      <Tooltip content={active ? 'You are here' : `Jump to step #${index}`}>
        <Button
          size="sm"
          variant={active ? 'secondary' : 'outline'}
          onClick={() => onJump?.(index)}
          disabled={active}
        >
          <Icon name="arrow" size={14} /> Go to
        </Button>
      </Tooltip>
    </Card>
  );
}

/* ------------- helpers ------------- */

function extractHex(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.startsWith('#') ? value : '';
  if (typeof value === 'object') {
    return value.hex || value.baseHex || value.color || '';
  }
  return '';
}

function extractLabel(value, i) {
  if (!value || typeof value === 'string') return `Step ${i + 1}`;
  if (typeof value === 'object') return value.label || value.name || `Step ${i + 1}`;
  return `Step ${i + 1}`;
}
