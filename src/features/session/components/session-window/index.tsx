import { SessionSelect } from '@/features/session/components/session-select';
import type { Config } from '../../../../config'
import { SessionContainer } from '../session-container'

type Props = {
  config: Config
  onClose: () => void
}
export function SessionWindow({ onClose }: Props) {
  return (
    <div
      className="snipet-window"
      role="dialog"
      aria-label="Session"
    >
      <header className="snipet-window__header">
        <SessionSelect />
        <button type="button" className="snipet-window__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </header>

      <SessionContainer />
    </div>
  )
}
