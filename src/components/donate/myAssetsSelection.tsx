import React, { useState } from "react";
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
export type AssetType = {
	symbol: string;
	name: string;
	balance: number;
	balanceInUSD: number;
	address: `0x${string}`;
};
interface MyAssetsSelectionProps {
	selectedAsset: AssetType;
	setSelectedAsset: (asset: AssetType) => void;
	availableAssets: AssetType[];
}

export default function MyAssetsSelection({
	selectedAsset,
	setSelectedAsset,
	availableAssets,
}: MyAssetsSelectionProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				id="select-value-button"
				variant={"outlined"}
				minW={"80px"}
				onClick={onOpen}>
				{selectedAsset.symbol}
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
						{availableAssets.map((asset) => (
							<div key={asset.name}>
								<AssetSelectionRow
									symbol={asset.symbol}
									name={asset.name}
									selected={selectedAsset.symbol === asset.symbol}
									onSelect={() => {
										setSelectedAsset(asset);
										onClose();
									}}
									balance={asset.balance}
									balanceInUSD={asset.balanceInUSD}
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
