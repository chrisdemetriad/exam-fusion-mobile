import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "@lib/supabase";
import ss from "styles/styles";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function signInWithEmail() {
		if (!email || !password) {
			Alert.alert("Sign-in error", "Please provide both email and password");
			setLoading(false);
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			Alert.alert("Sign-in error", error.message);
		} else {
			router.replace("/practice");
		}

		setLoading(false);
	}

	return (
		<View style={ss.container}>
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
				onPress={signInWithEmail}
			>
				<Text style={ss.buttonText}>Sign in</Text>
			</Pressable>
			<Pressable onPress={() => router.push("/auth/forgot-password")}>
				<Text style={ss.linkText}>Forgot password?</Text>
			</Pressable>
			<Pressable onPress={() => router.push("/auth/sign-up")}>
				<Text style={ss.linkText}>Don't have an account? Sign up</Text>
			</Pressable>
		</View>
	);
}
