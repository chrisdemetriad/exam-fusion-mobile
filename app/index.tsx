import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
	return (
		<View>
			<Text>Welcome</Text>
			<Text>Your free practice tests</Text>
			<Text>
				Our platform offers a comprehensive set of practice tests designed to
				help you excel in your studies.
			</Text>
			<Text>
				With a user-friendly interface and diverse question sets, you can
				practice anytime, anywhere.
			</Text>
			<Text>
				Accessible Anytime – take practice tests at your convenience, without
				the constraints of location or time.
			</Text>
			<Text>
				Diverse Question Sets – access a wide variety of questions across
				multiple subjects and difficulty levels.
			</Text>
			<Text>
				Instant Feedback – receive immediate results and performance analytics
				to help identify strengths and weaknesses.
			</Text>

			<Link href="/home">Next screen!</Link>
		</View>
	);
};

export default index;
