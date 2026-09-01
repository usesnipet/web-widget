import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"
import { Chat } from "./chat"
import type { Config } from "./config"
import { ConfigProvider } from "./context/config"

export const App = ({ config }: { config: Config }) => {
	return (
		<ConfigProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<Chat />
			</QueryClientProvider>
		</ConfigProvider>
	)
}