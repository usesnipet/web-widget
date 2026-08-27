import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"
import { Chat } from "./chat"
import type { Config } from "./config"

export const App = ({ config }: { config: Config }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Chat config={config} />
		</QueryClientProvider>
	)
}