import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
async function initMoralis() {
	if (!Moralis) {
		await Moralis.start({
			apiKey: process.env.MORALIS_KEY,
		});
	}
}
export async function getTokenPrice(tokenAddress: string) {
	try {
		await initMoralis();

		// const address = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
		// const address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

		const chain = EvmChain.ETHEREUM;

		const response = await Moralis.EvmApi.token.getTokenPrice({
			address: tokenAddress,
			chain,
		});

		console.log(response.raw);

		return response.raw;
	} catch (e) {
		console.error(e);
	}
}

export async function ETHPrice(amount: string) {
	const res = await fetch(
		`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHSCAN_KEY}}`
	);
	const data = await res.json();
	const price = parseFloat(data.result.ethusd);
	const _amount = parseFloat(amount);
	const total = price * _amount;

	return total.toPrecision(6);
}
