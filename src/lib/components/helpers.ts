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
