import { StyleSheet } from "react-native";

const ss = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	label: {
		fontSize: 16,
		color: "#333",
		marginBottom: 5,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	inputIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
	button: {
		backgroundColor: "blue",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginBottom: 10,
	},
	buttonDisabled: {
		backgroundColor: "#d3d3d3",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	successText: {
		textAlign: "center",
		marginBottom: 10,
		color: "green",
	},
	linkText: {
		textAlign: "center",
		color: "blue",
		textDecorationLine: "underline",
		fontSize: 14,
	},
});

export default ss;
