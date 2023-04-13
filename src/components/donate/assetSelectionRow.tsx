import React, { useContext, useEffect } from "react";
import { Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";
import { Context } from "@/lib/providers/provider";

interface AssetSelectionRowProps {
	selected: boolean; // true if this row is selected
	onSelect: () => void; // callback to select this row
	address: `0x${string}`; // 1570.50 (displayed as $1570.50 USD)
}

export default function AssetSelectionRow({
	selected,
	onSelect,
	address,
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
	console.log({ data });
	console.log({ address });
	console.log({ walletAddress });
	if (isLoading) return <div>Fetching token…</div>;
	if (isError) return <div>Error fetching token</div>;
	return (
		<div className="asset-selection-row-container" onClick={onSelect}>
			<Radio isChecked={selected} colorScheme={"pink"} />
			<div className="asset-info-text-container">
				<div className="asset-info-top-row">
					<h3>{data?.symbol}</h3>
					<h3>{data?.formatted.substring(0, 8)}</h3>
				</div>
				<div className="asset-info-bottom-row">
					{/* <h6 className="balance">{data?.name}</h6> */}
					{/* <h6 className="balance-in-usd">${balanceInUSD?.toFixed(2)} USD</h6> */}
				</div>
			</div>
		</div>
	);
}
