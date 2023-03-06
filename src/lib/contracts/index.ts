import { BigNumber, ethers, Signer } from "ethers";
import validateCharities from "../ABIs/validateCharities.json";
import charitiesRegistry from "../ABIs/charitiesRegistry.json";

function Contracts(signer: Signer) {
	const validateAddress = "0x74E941F4Ce36338EB9D914f1a0CE99B50E312309";
	const charitiesRegistryAddress = "0x57873D8e43FbeF0507f044f04ae39E496342487C";

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
	signer: Signer
) {
	const { CharitiesRegistry } = Contracts(signer);

	// Calculating Gas fees
	const gasFee = await CharitiesRegistry.estimateGas.makeDonation(charityId, {
		value: _value,
	});

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
}
async function ResolveCharities(charityId: number, signer: Signer) {
	const { ValidateCharities } = Contracts(signer);
	await ValidateCharities.resolveCharity(charityId);
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
};
