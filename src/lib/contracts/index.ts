import { BigNumber, ethers } from "ethers";
import { useSigner } from "wagmi";
import validateCharities from "../ABIs/validateCharities.json";
import charitiesRegistry from "../ABIs/charitiesRegistry.json";

function Contracts() {
	const validateAddress = "0x169f449EEb98333F3336fe97239Afd7bF97c8166";
	const charitiesRegistryAddress = "0xbFD279BA2E714111B30B04ad52e893D1e99Ae6E4";
	const { data: signer, isLoading } = useSigner();

	if (isLoading) return null;
	else if (!signer) return null;
	else {
		const ValidateCharities = new ethers.Contract(
			validateAddress,
			validateCharities,
			signer
		);

		const CharitiesRegistry = new ethers.Contract(
			charitiesRegistryAddress,
			charitiesRegistry,
			signer
		);

		return {
			ValidateCharities,
			CharitiesRegistry,
		};
	}
}
async function InitCharity(charity) {
	const { ValidateCharities } = Contracts();

	await ValidateCharities.initCharity(
		charity.charityAddress,
		charity.name,
		charity.ownsWallet,
		charity.info
	);
}
async function getCharityStatus(charityId: string) {
	const { ValidateCharities } = Contracts();
	const status = await ValidateCharities.getCharityStatus(charityId);
	return status;
}
async function getCharityVotes(charityId: string) {
	//todo: check on this
	const { ValidateCharities } = Contracts();
	const [approved, disapproved] = await ValidateCharities.getVotes(charityId);
	return {
		approveVotes: approved,
		disapproveVotes: disapproved,
	};
}
async function Vote(charityId: string, approves: boolean) {
	const { ValidateCharities } = Contracts();
	await ValidateCharities.vote(charityId, approves);
}
async function MakeDonation(charityId: string, _value: BigNumber) {
	const { CharitiesRegistry } = Contracts();
	const result = await CharitiesRegistry.makeDonation(charityId, {
		value: _value,
	});
	return result;
}
async function ResolveCharities(charityId: string) {
	const { ValidateCharities } = Contracts();
	await ValidateCharities.resolveCharity(charityId);
}
export {
	InitCharity,
	getCharityVotes,
	getCharityStatus,
	Vote,
	MakeDonation,
	ResolveCharities,
};
