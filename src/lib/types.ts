export type CharityCardProps = {
	id: string;
	pic: string;
	name: string;
};
export type CharityDataProps = {
	id: string;
	pic?: string;
	name: string;
	description?: string;
	location?: string;
	mission?: string;
	website?: string;
	contact?: string;
	tags?: string[];
};

//General Types

export type OptionProps = {
	label: string;
	type?: "report" | "share" | string;
	icon?: any;
	command?: string;
};
