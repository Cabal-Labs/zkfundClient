// handles api requests related to validating charities
import { createClient } from "urql";
const APIURL = "https://api.studio.thegraph.com/query/43431/zkfundv1/v0.0.1";
const client = createClient({
	url: APIURL,
});
// access all requests events using the graph
export async function GetAllCharities() {
	const query = `
    {
        charityCreateds {
            id
            name
            charityId
            status
            charityAddress
          }
    }
    `;
	// make the request
	let result = await client.query(query, {}).toPromise();
	console.log({ result });
	return result.data.charityCreateds;
}
export async function SearchCharities(search: string) {
	const query = `
    {
        charityCreateds(where: {name_contains: "${search}"}) {
            id
            charityAddress
            name
            charityId
            status
          }
        }`;
	let result = await client.query(query, { search }).toPromise();
	return result.data.charityCreateds;
}
export async function GetVoteState(
	validatorAddress: string,
	charityId: number
) {
	const query = `
    {
        approveVotes(where: {validator: "${validatorAddress}", charityId: ${charityId}}) {
            id
        }
        disapproveVotes(where: {validator: "${validatorAddress}", charityId: ${charityId}}) {
            id
        }
    }`;
	let result = await client
		.query(query, { validatorAddress, charityId })
		.toPromise();
	return result.data.approveVotes;
}
export async function getCharityInfo(charityId: number) {
	const query = `
    {
        charityApproveds(where: {charityId: "${charityId}"}) {
            id
            charityId
            name
            charityAddress
            status
        }
    }`;
	let result = await client.query(query, { charityId }).toPromise();
	console.log(result);
	return result.data;
}
// export async function GetCharityRequests() {
// 	const query = `
//     {
//         CharityCreated {
//             name
//         }
//     }
//     `;
// }
