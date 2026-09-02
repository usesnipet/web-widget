/** Shown in place of the message list when there's no active session yet. */
export function SessionEmptyState() {
  return (
    <div className="snipet-empty-state">
      <p className="snipet-empty-state__text">Faça uma pergunta para começar a conversa.</p>
    </div>
  );
}
