import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

export async function initMoralis() {
	await Moralis.start({
		apiKey: process.env.MORALIS_KEY,
	});
	return Moralis;
}

type TokenInfo = {
	usdPrice: number;
	nativePrice: any;
};
export async function getTokenInfo(
	tokenAddress: string,
	_Moralis: any
): Promise<TokenInfo> {
	try {
		const chain = EvmChain.POLYGON;
		// console.log("chain: ", chain);
		// console.log("tokenAddress: ", tokenAddress);
		let mainnetTokenAddress = mumbaiToMainnet(tokenAddress);
		// console.log("mainet address: ", mainnetTokenAddress);
		const response = await _Moralis.EvmApi.token.getTokenPrice({
			address: mainnetTokenAddress,
			chain,
		});
		const data = {
			usdPrice: response.usdPrice,
			nativePrice: response.nativePrice,
		};
		// console.log("response:", response.toJSON());

		return data;
	} catch (e) {
		console.error(e);
		return {
			usdPrice: 0,
			nativePrice: 0,
		}; // Return null or other default value if the API call fails.
	}
}
function mumbaiToMainnet(address: string) {
	//only storing list of white listed tokens - wETH, MATIC, USDC
	// translate = key: mumbaiAddress, value: mainnetAddress
	const translate = {
		"0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa":
			"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", //wETH
		"0x0FA8781a83E46826621b3BC094Ea2A0212e71B23":
			"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", //USDC
		"0x0000000000000000000000000000000000000000":
			"0x0000000000000000000000000000000000000000", //MATIC
		"0xE097d6B3100777DC31B34dC2c58fB524C2e76921":
			"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", //USDC 2
	};

	const d: string = translate[address];
	return d;
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
