import Modal from '../../components/common/Modal.jsx';
import Showcase from './Showcase.jsx';

export default function ShowcaseModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Live UI Showcase — every common component in your color" size="full">
      <Showcase embedded />
    </Modal>
  );
}
