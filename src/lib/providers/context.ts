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
	isMoralisConnected: boolean;
	setIsMoralisConnected: (moralisConnected: boolean) => void;
	moralis: any;
	setMoralis: (moralis: any) => void;
}
const AllData = () => {
	const [pubAddress, setPubAddress] = useState<string>("");
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [walletAddress, setWalletAddress] = useState<string>("");
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [isMoralisConnected, setIsMoralisConnected] = useState<boolean>(false);
	const [moralis, setMoralis] = useState<any>({});
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
			isMoralisConnected,
			setIsMoralisConnected,
			moralis,
			setMoralis,
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
			isMoralisConnected,
			setIsMoralisConnected,
			moralis,
			setMoralis,
		]
	);
	return provider;
};

export default AllData;
