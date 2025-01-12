import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "@lib/supabase";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	async function resetPassword() {
		setLoading(true);
		const { error } = await supabase.auth.resetPasswordForEmail(email);

		if (error) {
			Alert.alert("Error", error.message);
		} else {
			setEmailSent(true);
		}
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			{emailSent ? (
				<View style={{ alignItems: "center" }}>
					<Text style={styles.successText}>
						Check your email for password reset instructions
					</Text>
					<Pressable onPress={() => setEmailSent(false)}>
						<Text style={styles.linkText}>Press here to try again</Text>
					</Pressable>
				</View>
			) : (
				<>
					<View style={styles.inputContainer}>
						<Icon
							name="envelope"
							size={20}
							color="#888"
							style={styles.inputIcon}
						/>
						<TextInput
							style={styles.input}
							onChangeText={(text) => setEmail(text)}
							value={email}
							placeholder="email@address.com"
							autoCapitalize="none"
							keyboardType="email-address"
						/>
					</View>
					<Pressable
						style={[styles.button, loading && styles.buttonDisabled]}
						disabled={loading}
						onPress={resetPassword}
					>
						<Text style={styles.buttonText}>Reset password</Text>
					</Pressable>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
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
	},
	linkText: {
		color: "blue",
		textDecorationLine: "underline",
	},
});
