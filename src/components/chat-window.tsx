import type { Config } from '../config'

type Props = {
  config: Config
  onClose: () => void
}
export function ChatWindow({ onClose }: Props) {

  return (
    <div
      className="flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
      role="dialog"
      aria-label="Chat"
    >
      <header className="flex items-center justify-between bg-neutral-900 px-4 py-3.5 font-medium text-white dark:bg-neutral-950">
        <span>{'Assistente'}</span>
        <button type="button" className="cursor-pointer border-none bg-transparent text-xl leading-none text-white" onClick={onClose} aria-label="Close">
          ×
        </button>
      </header>
{/*
      <MessageList messages={messages} />

      <MessageInput onSend={handleSend} disabled={!session || sending} /> */}
    </div>
  )
}
