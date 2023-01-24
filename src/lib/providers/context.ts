import { useMemo, useState } from "react";
export interface Data {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
	address: string;
	setAddress: (userId: string) => void;
}
const AllData = () => {
	const [address, setAddress] = useState<string>("");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	const provider = useMemo(
		() => ({
			loggedIn,
			setLoggedIn,
			address,
			setAddress,
		}),
		[loggedIn, setLoggedIn, address, setAddress]
	);
	return provider;
};

export default AllData;
