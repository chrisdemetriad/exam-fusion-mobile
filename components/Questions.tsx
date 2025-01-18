import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	StyleSheet,
	FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchQuestions } from "@lib/api/fetchQuestions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTestStore } from "@store/stateStore";
import { useAuthStore } from "@store/authStore";
import { saveTest, type TestData } from "@lib/api/saveTest";

interface Answers {
	answer: string;
	isCorrect?: boolean;
}

export interface Question {
	id: number;
	question: string;
	type: string;
	answers: Answers[];
}

export interface QuestionsResponse {
	questions: Question[];
}

const getCorrectAnswers = (question: Question) =>
	question.answers
		.filter((answer) => answer.isCorrect)
		.map((answer) => answer.answer);

const isAnswerCorrect = (selectedAnswers: string[], question: Question) => {
	const correctAnswers = getCorrectAnswers(question);
	return (
		selectedAnswers.length === correctAnswers.length &&
		selectedAnswers.every((answer) => correctAnswers.includes(answer))
	);
};

const Questions = () => {
	const { session } = useAuthStore();
	const [questionsNumber, setQuestionsNumber] = useState(20);
	const currentTest = useTestStore((state) => state.currentTest);
	const addAnswer = useTestStore((state) => state.addAnswer);
	const resetTest = useTestStore((state) => state.resetTest);
	const [started, setStarted] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [feedback, setFeedback] = useState<{
		isCorrect: boolean | null;
		show: boolean;
	}>({
		isCorrect: null,
		show: false,
	});
	const [startTime, setStartTime] = useState<Date | null>(null);

	const router = useRouter();
	const { provider, testId } = useLocalSearchParams();

	const { data, isLoading, isError, error } = useQuery<
		QuestionsResponse,
		Error
	>({
		queryKey: ["questions", provider, testId, questionsNumber],
		queryFn: () =>
			fetchQuestions({
				provider: provider as string,
				testId: testId as string,
				questionsNumber,
			}),
		enabled: !!provider && !!testId,
	});
	if (isLoading) <ActivityIndicator size="large" color="blue" />;
	if (isError) <Text>Error {error?.message}</Text>;

	const questions = data?.questions || [];
	const totalQuestions = questions.length;

	useEffect(() => {
		if (provider && testId) resetTest();
	}, [provider, testId, resetTest]);

	const handleStartTest = () => {
		setStartTime(new Date());
		setStarted(true);
	};

	const mutation = useMutation({
		mutationFn: (testData: TestData) =>
			saveTest({
				provider: provider as string,
				testId: testId as string,
				testData,
			}),
	});

	const handleSaveTest = async (testData: TestData) => {
		try {
			await mutation.mutateAsync(testData);
		} catch (error) {
			console.error(`Couldn't save the test ${error}`);
		}
	};

	const handleAnswerSelect = (selectedValue: string) => {
		if (feedback.show) return;

		const currentQuestion = questions[currentIndex];

		if (currentQuestion.type === "checkbox") {
			setSelectedAnswers((prev) =>
				prev.includes(selectedValue) ? prev : [...prev, selectedValue],
			);

			const correctAnswers = getCorrectAnswers(currentQuestion);
			const newSelectedAnswers = selectedAnswers.includes(selectedValue)
				? selectedAnswers
				: [...selectedAnswers, selectedValue];

			if (newSelectedAnswers.length === correctAnswers.length) {
				handleSubmitAnswer(newSelectedAnswers);
			}
		} else {
			setSelectedAnswers([selectedValue]);
			handleSubmitAnswer([selectedValue]);
		}
	};

	const handleSubmitAnswer = (answers: string[]) => {
		const currentQuestion = questions[currentIndex];
		const correct = isAnswerCorrect(answers, currentQuestion);
		setFeedback({ isCorrect: correct, show: true });
		addAnswer({
			id: currentQuestion.id,
			question: currentQuestion.question,
			userAnswer: answers,
			answer: getCorrectAnswers(currentQuestion),
			isCorrect: correct,
		});
	};

	const handleNextQuestion = async () => {
		setSelectedAnswers([]);
		setFeedback({ isCorrect: null, show: false });

		if (currentIndex < totalQuestions - 1) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			const finishTime = new Date();
			const allAnswers = useTestStore.getState().answers;

			const correctAnswersCount = allAnswers.filter(
				(answer) => answer.isCorrect,
			).length;
			const totalQuestions = allAnswers.length;
			const score = (correctAnswersCount / totalQuestions) * 100;

			const testData: TestData = {
				testId: testId as string,
				userId: session?.user?.email || "unknown",
				startTime,
				finishTime,
				number: Number(questionsNumber),
				score,
				wrong: allAnswers
					.filter((answer) => !answer.isCorrect)
					.map((answer) => ({
						questionId: answer.id,
						question: answer.question,
						answer: answer.answer,
					})),
			};

			await handleSaveTest(testData);
			router.push("/summary");
		}
	};

	if (!started) {
		return (
			<View style={{ padding: 20, flex: 1, justifyContent: "space-around" }}>
				<View style={{ flexGrow: 1 }}>
					<Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>
						{provider}
					</Text>
					<Text style={{ fontSize: 20, marginBottom: 10 }}>
						{currentTest.description}
					</Text>
				</View>
				<View style={{ flexGrow: 1 }}>
					<Text style={{ marginBottom: 15 }}>
						There are {questions.length} questions.
					</Text>
					<Text style={{ marginBottom: 15 }}>There is no time limit.</Text>
					<Text style={{ marginBottom: 15 }}>
						Choose a test type then press Start to begin.
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 16,
							backgroundColor: "#ddd",
							padding: 5,
							borderRadius: 8,
							display: "flex",
						}}
					>
						<TouchableOpacity
							style={{
								flex: 1,
								alignItems: "center",
								padding: 8,
								backgroundColor: questionsNumber === 10 ? "#fff" : "#ddd",
								borderRadius: 8,
							}}
							onPress={() => setQuestionsNumber(10)}
						>
							<Text>Short (10 questions)</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								flex: 1,
								alignItems: "center",
								padding: 8,
								backgroundColor: questionsNumber === 20 ? "#fff" : "#ddd",
								borderRadius: 8,
							}}
							onPress={() => setQuestionsNumber(20)}
						>
							<Text>Long (20 questions)</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={{
						backgroundColor: "blue",
						padding: 15,
						borderRadius: 5,
						marginTop: 20,
					}}
					onPress={handleStartTest}
				>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							fontWeight: "bold",
						}}
					>
						Start
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const currentQuestion = questions[currentIndex];

	return (
		<View style={{ padding: 20, flex: 1, justifyContent: "space-between" }}>
			<Text style={{ fontSize: 18, marginBottom: 20 }}>
				{currentQuestion.question}
			</Text>
			<FlatList
				data={currentQuestion.answers}
				keyExtractor={(item) => item.answer}
				renderItem={({ item }) => {
					const isSelected = selectedAnswers.includes(item.answer);
					const isCorrectAnswer = feedback.show && item.isCorrect;
					const isIncorrectAnswer =
						feedback.show && isSelected && !item.isCorrect;

					return (
						<TouchableOpacity
							style={[
								{
									padding: 15,
									marginVertical: 5,
									borderRadius: 5,
									borderWidth: 1,
									borderColor: "#ddd",
									backgroundColor: isCorrectAnswer
										? "#d3f9d8"
										: isIncorrectAnswer
											? "#ffcccb"
											: "#f0f0f0",
								},
								isSelected &&
									!feedback.show && {
										backgroundColor: "#e0e0e0",
									},
							]}
							onPress={() => handleAnswerSelect(item.answer)}
						>
							<Text
								style={{
									color: isCorrectAnswer
										? "green"
										: isIncorrectAnswer
											? "red"
											: "#000",
									textDecorationLine: isIncorrectAnswer
										? "line-through"
										: "none",
								}}
							>
								{item.answer}
							</Text>
						</TouchableOpacity>
					);
				}}
			/>
			<TouchableOpacity
				style={{
					backgroundColor: "blue",
					padding: 15,
					borderRadius: 5,
					marginTop: 20,
				}}
				onPress={handleNextQuestion}
				disabled={!selectedAnswers.length}
			>
				<Text
					style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
				>
					{currentIndex < totalQuestions - 1 ? "Next" : "Finish"}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Questions;
