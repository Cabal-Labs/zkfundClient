import { BigNumber, ethers, Signer } from "ethers";
import validateCharities from "../ABIs/validateCharities.json";
import charitiesRegistry from "../ABIs/charitiesRegistry.json";

function Contracts(signer: Signer) {
	const validateAddress = "0x169f449EEb98333F3336fe97239Afd7bF97c8166";
	const charitiesRegistryAddress = "0xbFD279BA2E714111B30B04ad52e893D1e99Ae6E4";

	
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
async function InitCharity(charity:any, signer:Signer ) {
	const { ValidateCharities } = Contracts(signer);
	// Calculating Gas fees
	const gasFee = await ValidateCharities.estimateGas.initCharity(
		charity.charityAddress,
		charity.name,
		charity.ownsWallet,
		charity.info
	);
	try{
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
		return {data, ok};
	}catch(e){
		console.log(e);
		const ok = false;
		const data = e.data;
		return  {data, ok} 
	}
}
async function getCharityStatus(charityId: string, signer:Signer ) {
	const { ValidateCharities } = Contracts(signer);
	const status = await ValidateCharities.getCharityStatus(charityId);
	return status;
}
async function getCharityVotes(charityId: string, signer:Signer ) {
	//todo: check on this
	const { ValidateCharities } = Contracts(signer);
	const [approved, disapproved] = await ValidateCharities.getVotes(charityId);
	return {
		approveVotes: approved,
		disapproveVotes: disapproved,
	};
}
async function Vote(charityId: number , approves: boolean, signer:Signer ) {
	const { ValidateCharities } = Contracts(signer);
	await ValidateCharities.vote(charityId, approves);
}
async function MakeDonation(charityId: number, _value: BigNumber, signer:Signer ) {
	const { CharitiesRegistry } = Contracts(signer);

	// Calculating Gas fees
	const gasFee = await CharitiesRegistry.estimateGas.makeDonation(charityId, {
		value: _value,
	});
	
	// Making the donation
	try{
		const result = await CharitiesRegistry.makeDonation(charityId, {
		value: _value,
		gasLimit: gasFee,
		});
		return result;
	}catch(e){
		console.log(e);
		return e;
	}
	
}
async function ResolveCharities(charityId: string, signer: Signer ) {
	const { ValidateCharities } = Contracts(signer);
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
