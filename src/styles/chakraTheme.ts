import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};
const colors = {
	primary: "#D37CF1",
	primaryLight: "#E5A7FB",
	primaryDark: "#961BC0",
	text: "#FCFCFC",
	secondaryText: "#cccccc",
	background: "#22142F",
	foreground: "#422552",
	danger: "#C74F4F",
	success: "#65B36D",
	link: "#4C81BF",
};
const components = {
	Button: {
		baseStyle: {
			margin: 0.5,
			_hover: { opacity: "75%" },
			_focus: {
				boxShadow: "none",
			},
		},
		sizes: {
			xl: {
				h: "56px",
				fontSize: "lg",
				px: "32px",
			},
		},

		variants: {
			contained: () => ({
				color: "white",
				backgroundColor: colors.primary,
				_hover: {
					_disabled: {
						opacity: 0.25,
						backgroundColor: colors.primary,
					},
				},
			}),
			primary: () => ({
				color: colors.primaryDark,
				backgroundColor: colors.primaryLight,
			}),
			danger: () => ({
				color: "white",
				backgroundColor: colors.danger,
			}),
			success: () => ({
				color: "white",
				backgroundColor: colors.success,
			}),
			outlined: () => ({
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: colors.secondaryText,
				color: colors.text,
				_hover: { backgroundColor: colors.foreground },
			}),
			text: () => ({
				_hover: { backgroundColor: colors.foreground },
			}),
			link: () => ({
				color: colors.link,
				_hover: { backgroundColor: colors.foreground },
			}),
			filled: () => ({
				backgroundColor: colors.foreground,
			}),
		},
		default: {
			variant: "contained",
		},
	},
	IconButton: {
		variant: {
			text: () => ({
				backgroundColor: "transparent",
			}),
		},
	},
	Tooltip: {
		baseStyle: () => ({
			borderRadius: 5,
			backgroundColor: colors.foreground,
			color: colors.text,
		}),
	},
	Alert: {
		backgroundColor: "red",
	},
	Input: {
		baseStyle: {},
		variants: {
			filled: () => ({
				backgroundColor: colors.foreground,
			}),
		},
	},
	Popover: {
		// parts: ["portal", "header", "body"],
		variants: {
			primary: () => ({
				backgroundColor: colors.foreground,
			}),
		},
	},
	Tag: {
		variants: {
			contained: () => ({
				color: "white",
				backgroundColor: colors.primary,
			}),
			danger: () => ({
				color: "white",
				backgroundColor: colors.danger,
			}),
			outlined: () => ({
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: colors.secondaryText,
				color: colors.text,
				_hover: { backgroundColor: colors.foreground },
			}),
			text: () => ({
				_hover: { backgroundColor: colors.foreground },
			}),
			filled: () => ({
				backgroundColor: colors.foreground,
			}),
		},
	},
	Drawer: {
		parts: ["dialog", "header", "body"],
		variants: {
			primary: () => ({
				dialog: {
					backgroundColor: colors.foreground,
				},
			}),
		},
	},
};
const chakraTheme = extendTheme({ components, colors, config });
export default chakraTheme;
