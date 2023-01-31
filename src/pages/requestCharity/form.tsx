import React, { useState } from "react";
import ScreenWrapper from "@/components/layout/screenWrapper";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
} from "@chakra-ui/react";

export default function Charity(props) {
	const [name, setName] = useState<string>("");
	return (
		<FormControl>
			<FormLabel>Name of Charity/Organization</FormLabel>
			<h1 style={{ color: "black" }}>{name}</h1>
			<Input value={name} onChange={(e) => setName(e.target.value)} />
		</FormControl>
	);
}
