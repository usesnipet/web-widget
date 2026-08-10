import type { Config } from '../config'

type Props = {
  config: Config
  onClose: () => void
}
export function ChatWindow({ onClose }: Props) {

  return (
    <div className="snipet-window" role="dialog" aria-label="Chat">
      <header className="snipet-header">
        <span>{'Assistente'}</span>
        <button type="button" className="snipet-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </header>
{/*
      <MessageList messages={messages} />

      <MessageInput onSend={handleSend} disabled={!session || sending} /> */}
    </div>
  )
}
