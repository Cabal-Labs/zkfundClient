import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/index.scss";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@/lib/providers/provider";
import chakraTheme from "@/styles/chakraTheme";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "@/lib/rainbowKit/config";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: "#d37cf1",
				})}>
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
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
