import { BigNumber, ethers, Signer } from "ethers";
import validateCharities from "../ABIs/validateCharities.json";
import charitiesRegistry from "../ABIs/charitiesRegistry.json";

function Contracts(signer: Signer) {
	const validateAddress = "0xF166d4cD88957d5e7b2aB56cf45240f67C838499";
	const charitiesRegistryAddress = "0x130eA5825782298baAf52341Fb0b792569d5AA1b";

	const ValidateCharities = new ethers.Contract(
		validateAddress,
		validateCharities,
		signer
	);
	const CharitiesRegistry = new ethers.Contract(
		charitiesRegistryAddress,
		//@ts-ignore
		charitiesRegistry,
		signer
	);

	return {
		ValidateCharities,
		CharitiesRegistry,
	};
}
async function InitCharity(charity: any, signer: Signer) {
	const { ValidateCharities } = Contracts(signer);
	// Calculating Gas fees
	const gasFee = await ValidateCharities.estimateGas.initCharity(
		charity.charityAddress,
		charity.name,
		charity.ownsWallet,
		charity.info
	);
	try {
		const data = await ValidateCharities.initCharity(
			charity.charityAddress,
			charity.name,
			charity.ownsWallet,
			charity.info,
			{
				gasLimit: gasFee,
			}
		);
		const ok = true;
		return { data, ok };
	} catch (e) {
		console.log(e);
		const ok = false;
		const data = e.data;
		return { data, ok };
	}
}
async function getCharityStatus(charityId: string, signer: Signer) {
	const { ValidateCharities } = Contracts(signer);
	const status = await ValidateCharities.getCharityStatus(charityId);
	return status;
}
async function GetCharityVotes(charityId: number, signer: Signer) {
	//todo: check on this
	const { ValidateCharities } = Contracts(signer);
	const [approved, disapproved] = await ValidateCharities.getVotes(charityId);
	return {
		approveVotes: approved,
		disapproveVotes: disapproved,
	};
}
async function Vote(charityId: number, approves: boolean, signer: Signer) {
	const { ValidateCharities } = Contracts(signer);
	await ValidateCharities.vote(charityId, approves);
}
async function MakeDonation(
	charityId: number,
	_value: BigNumber,
	_tokensA: string,
	signer: Signer
) {
	const { CharitiesRegistry } = Contracts(signer);
	if (_tokensA == "0") {
		const gasFee = await CharitiesRegistry.estimateGas.makeDonation(
			charityId,
			_tokensA,
			0,
			{
				value: _value,
			}
		);

		// Making the donation
		try {
			const result = await CharitiesRegistry.makeDonation(charityId, {
				value: _value,
				gasLimit: gasFee,
			});
			return result;
		} catch (e) {
			console.log(e);
			return e;
		}
	} else {
	}
}
async function ResolveCharities(charityId: number, signer: Signer) {
	const { ValidateCharities } = Contracts(signer);
	try {
		const _fees = ValidateCharities.estimateGas.resolveCharity(charityId);
		await ValidateCharities.resolveCharity(charityId, {
			gasLimit: _fees,
		});
	} catch (e) {
		console.log(e);
	}
}
async function GetCharityRequests(signer: Signer) {
	const { ValidateCharities } = Contracts(signer);
	const requests = await ValidateCharities.getCharityRequests();
	return requests;
}
async function GetVoteState(signer: Signer, charityId: number) {
	const { ValidateCharities } = Contracts(signer);
	let hasVoted: boolean;
	try {
		hasVoted = await ValidateCharities.validatorToCharity(
			signer.getAddress(),
			charityId
		);
	} catch (e) {
		console.log(e);
	}
	return hasVoted;
}
async function GetCharityInfo(charityId: number, signer: Signer) {
	const { CharitiesRegistry } = Contracts(signer);
	const info = await CharitiesRegistry.getCharityInfo(charityId);
	return info;
}
async function GetDonationPools(charityId: number, signer: Signer) {
	const { CharitiesRegistry } = Contracts(signer);

	try{
		const data = await CharitiesRegistry.getDonationPools(charityId);
		return data;
	}catch(e){
		console.log(e);
	}
	
}
async function WithdrawDonations(charityId: number, signer: Signer) {
	const { CharitiesRegistry } = Contracts(signer);
	try{
		const fees = await CharitiesRegistry.estimateGas.withdrawDonations(charityId);
		const data = await CharitiesRegistry.withdrawDonations(charityId,{
			gasLimit: fees
		});
		return data;
	}catch(e){
		console.log(e);
	}

	
}

export {
	InitCharity,
	GetCharityVotes,
	getCharityStatus,
	Vote,
	MakeDonation,
	ResolveCharities,
	GetCharityRequests,
	GetVoteState,
	GetCharityInfo,
	GetDonationPools,
	WithdrawDonations,
};
