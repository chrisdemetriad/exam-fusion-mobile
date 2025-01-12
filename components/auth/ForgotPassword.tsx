import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "@lib/supabase";
import ss from "styles/styles";

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
		<View style={ss.container}>
			{emailSent ? (
				<View style={{ alignItems: "center" }}>
					<Text style={ss.successText}>
						Check your email for password reset instructions
					</Text>
					<Pressable onPress={() => setEmailSent(false)}>
						<Text style={ss.linkText}>Press here to try again</Text>
					</Pressable>
				</View>
			) : (
				<>
					<View style={ss.inputContainer}>
						<Icon name="envelope" size={20} color="#888" style={ss.inputIcon} />
						<TextInput
							style={ss.input}
							onChangeText={(text) => setEmail(text)}
							value={email}
							placeholder="email@address.com"
							autoCapitalize="none"
							keyboardType="email-address"
						/>
					</View>
					<Pressable
						style={[ss.button, loading && ss.buttonDisabled]}
						disabled={loading}
						onPress={resetPassword}
					>
						<Text style={ss.buttonText}>Reset password</Text>
					</Pressable>
				</>
			)}
		</View>
	);
}
