import { SessionSelect } from '@/features/session/components/session-select';
import type { Config } from '../../../../config'
import { ChatContainer } from '../chat-container'

type Props = {
  config: Config
  onClose: () => void
}
export function ChatWindow({ onClose }: Props) {
  return (
    <div
      className="snipet-window"
      role="dialog"
      aria-label="Chat"
    >
      <header className="snipet-window__header">
        <SessionSelect />
        <button type="button" className="snipet-window__close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </header>

      <ChatContainer messages={[]} onSend={() => {}} />
    </div>
  )
}
