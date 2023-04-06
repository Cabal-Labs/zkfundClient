import React, { useContext, useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import AssetSelectionRow from "./assetSelectionRow";
import { useBalance } from "wagmi";
import { whiteListedTokens } from "@/pages/donate/[charityId]";
import { Context } from "@/lib/providers/provider";
export type AssetType = {
	balance: number;
	address: `0x${string}`;
};
interface MyAssetsSelectionProps {
	selectedAsset: `0x${string}`;
	setSelectedAsset: any;
}

export default function MyAssetsSelection({
	selectedAsset,
	setSelectedAsset,
}: MyAssetsSelectionProps) {
	const { walletAddress } = useContext(Context);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data, isError, isLoading } = useBalance({
		address: walletAddress as `0x${string}`,
		token: assetCheck(),
	});
	function assetCheck(): `0x${string}` {
		if (selectedAsset === "0x0000000000000000000000000000000000000000") {
			return null;
		} else {
			return selectedAsset;
		}
	}
	return (
		<>
			<Button
				id="select-value-button"
				variant={"outlined"}
				minW={"80px"}
				onClick={onOpen}>
				{data?.symbol}
			</Button>
			<Modal variant={"gradientOutlined"} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{/* used to be isError below */}
						<h2>My Assets</h2>
					</ModalHeader>
					{/* <ModalCloseButton /> */}
					<ModalBody>
						{whiteListedTokens.map((asset) => (
							<div key={asset}>
								<AssetSelectionRow
									address={asset}
									selected={asset === selectedAsset}
									onSelect={() => {
										setSelectedAsset(asset);
										onClose();
									}}
								/>
							</div>
						))}
						{/* <AssetSelectionRow
              ticker="ETH"
              name="Ethereum"
              selected={selectedAsset === "ETH"}
              onSelect={() => setSelectedAsset("ETH")}
              balance={0.00213}
              balanceInUSD={1570.5}
            />
            <AssetSelectionRow
              ticker="BTC"
              name="Bitcoin"
              selected={selectedAsset === "BTC"}
              onSelect={() => setSelectedAsset("BTC")}
              balance={0.00000213}
              balanceInUSD={12.39}
            /> */}
						<br />
						<p className="center">
							zk.fund only allows for trusted currencies to be donated. We're
							working on expanding this list.
						</p>
					</ModalBody>
					<ModalFooter style={{ justifyContent: "center" }}>
						<Button onClick={onClose} variant="pinkOutline">
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
