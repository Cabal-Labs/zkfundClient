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

		const chain = EvmChain.MUMBAI;
		console.log("chain: ", chain);
		console.log("tokenAddress: ", tokenAddress);
		const response = await Moralis.EvmApi.token.getTokenPrice({
			address: tokenAddress,
			chain,
		});

		console.log("response:", response);

		return response.raw;
	} catch (e) {
		console.error(e);
		return null; // Return null or other default value if the API call fails.
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
