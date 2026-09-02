import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

/** Text field plus send button; trims input and clears itself after sending. */
export function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <form className="snipet-input" onSubmit={submit}>
      <input
        className="snipet-input__field"
        type="text"
        placeholder="Digite uma mensagem..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="snipet-input__send"
        disabled={disabled || !value.trim()}
        aria-label="Enviar mensagem"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
