import { useMemo, useState } from "react";
export interface Data {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
	pubAddress: string;
	setPubAddress: (userId: string) => void;
	walletAddress: string;
	setWalletAddress: (walletAddress: string) => void;
	isConnected: boolean;
	setIsConnected: (isConnected: boolean) => void;
}
const AllData = () => {
	const [pubAddress, setPubAddress] = useState<string>("");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [walletAddress, setWalletAddress] = useState<string>("");
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const provider = useMemo(
		() => ({
			loggedIn,
			setLoggedIn,
			pubAddress,
			setPubAddress,
			walletAddress,
			setWalletAddress,
			isConnected,
			setIsConnected,
		}),
		[
			loggedIn,
			setLoggedIn,
			pubAddress,
			setPubAddress,
			walletAddress,
			setWalletAddress,
			isConnected,
			setIsConnected,
		]
	);
	return provider;
};

export default AllData;
