import "@/styles/index.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/lib/providers/provider";
import chakraTheme from "@/styles/chakraTheme";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={chakraTheme}>
			<Provider>
				<div id="screen-container">
					<style jsx global>{`
						body {
							background-color: #22142f;
						}
					`}</style>
					<Component {...pageProps} />
				</div>
			</Provider>
		</ChakraProvider>
	);
}
