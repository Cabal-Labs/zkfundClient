// File: Applies all meta tags
// Default
import React from "react";
// Libraries
import { Head } from "next/document";
interface HeadProps {
	title?: string;
}
export default function DefaultHead(props: HeadProps) {
	const { title } = { ...props };
	return (
		<Head>
			<title>{title || "zk.fund"}</title>
			<meta property="og:title" content={title || "Quae"} />
			<meta name="description" content={"TODO: FINISH DESCRIPTION: zk.fund"} />
			<meta
				property="og:description"
				content={
					"zk.fund enables purely anonymous donations via the Aztec Network"
				}
			/>
			<meta property="og:image" content={"/quae_logo.png"} />
			<meta property="og:url" content={"https://quae.app"} />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:image:alt" content={"/quae_logo.png"} />
			<meta property="twitter:text:title" content={title || "Quae"} />
			<meta property="keywords" content="donations, crypto, defi, charities" />
		</Head>
	);
}
