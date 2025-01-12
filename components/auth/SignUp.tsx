import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Pressable,
	Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { supabase } from "@lib/supabase";
import ss from "styles/styles";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const router = useRouter();

	async function signUpWithEmail() {
		if (!email || !password) {
			Alert.alert("Sign-up error", "Please provide both email and password");
			setLoading(false);
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.signUp({ email, password });

		if (error) {
			Alert.alert("Sign-up error", error.message);
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
						Check your email to confirm your account
					</Text>
					<Pressable onPress={() => router.push("/sign-in")}>
						<Text style={ss.linkText}>Go to Sign In</Text>
					</Pressable>
				</View>
			) : (
				<>
					<Text style={ss.label}>Email</Text>
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
					<Text style={ss.label}>Password</Text>
					<View style={ss.inputContainer}>
						<Icon name="lock" size={20} color="#888" style={ss.inputIcon} />
						<TextInput
							style={ss.input}
							onChangeText={(text) => setPassword(text)}
							value={password}
							secureTextEntry
							placeholder="Password"
							autoCapitalize="none"
						/>
					</View>
					<Pressable
						style={[ss.button, loading && ss.buttonDisabled]}
						disabled={loading}
						onPress={signUpWithEmail}
					>
						<Text style={ss.buttonText}>Sign up</Text>
					</Pressable>
				</>
			)}
		</View>
	);
}
