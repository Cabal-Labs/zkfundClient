import React, { createContext } from "react";
import AllData, { Data } from "./context";

export const Context = createContext<Data>({
	loggedIn: false,
	setLoggedIn: (boolean) => {},
	pubAddress: "",
	setPubAddress: (string) => {},
	walletAddress: "",
	setWalletAddress: (string) => {},
	isConnected: false,
	setIsConnected: (boolean) => {},
});

export const Provider = ({ children }: any) => {
	const data = AllData();
	return <Context.Provider value={data}>{children}</Context.Provider>;
};
