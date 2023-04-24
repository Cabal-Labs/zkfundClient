import React, { useContext, useEffect } from "react";
import { Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { useAccount, useBalance, useToken } from "wagmi";
import { Context } from "@/lib/providers/provider";

interface AssetSelectionRowProps {
	address: `0x${string}`; // 1570.50 (displayed as $1570.50 USD)
	amount: string;
}

export default function AssetDisplayRow({
	address,
	amount,
}: AssetSelectionRowProps) {
	const { address: walletAddress, isConnected } = useAccount();
	const { data, isError, isLoading } = useBalance({
		address: walletAddress,
		token: assetCheck(),
	});

	function assetCheck(): `0x${string}` {
		if (address === "0x0000000000000000000000000000000000000000") {
			return null;
		} else {
			return address;
		}
	}
	console.log({ address });
	console.log({ walletAddress });
	if (isLoading) return <div>Fetching token…</div>;
	if (isError) return <div>Error fetching token</div>;
	return (
		<div className="asset-display-row-container">
			{data ? <h3>{data?.symbol}</h3> : <h3>MATIC</h3>}

			<h3>{amount}</h3>
		</div>
	);
}
