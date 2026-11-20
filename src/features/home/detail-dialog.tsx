import { useEffect, useId, useRef, type KeyboardEvent } from 'react';
import type { HomeDetail } from './home-content';

interface DetailDialogProps {
  detail: HomeDetail | null;
  onClose: (sectionId?: string) => void;
}

export function DetailDialog({ detail, onClose }: DetailDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (detail && !element.open) {
      element.showModal();
      closeButton.current?.focus();
    }
    if (!detail && element.open) element.close();
  }, [detail]);
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href]');
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  const primaryAction = detail?.primaryAction ?? { label: 'Get in touch', sectionId: 'contact' };
  return (
    <dialog
      ref={dialog}
      className="detail-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={containFocus}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {detail && (
        <div className="detail-dialog__content">
          <button
            ref={closeButton}
            className="detail-dialog__close"
            aria-label="Close dialog"
            onClick={() => onClose()}
          >
            ×
          </button>
          <p className="eyebrow">{detail.eyebrow}</p>
          <h2 id={titleId}>{detail.title}</h2>
          <p className="detail-dialog__description" id={descriptionId}>
            {detail.description}
          </p>
          {detail.facts && (
            <ul className="detail-dialog__facts">
              {detail.facts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          )}
          <div className="u-actions">
            {!detail.confirmation && (
              <a
                className="button button--primary"
                href={`#${primaryAction.sectionId}`}
                onClick={() => onClose(primaryAction.sectionId)}
              >
                {primaryAction.label}
              </a>
            )}
            <button className="button button--secondary" onClick={() => onClose()}>
              {detail.confirmation ? 'Done' : 'Keep exploring'}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
