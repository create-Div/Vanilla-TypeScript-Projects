import { convertTemperatures } from "./temperature";

function cleanSentence(sentence: string): string {
	return sentence
		.replace(/^step\s*\d*:?\s*/i, "")
		.replace(/^\d+[\.\)\-:\s]*\s*/i, "")
		.trim();
}

function pairSentences(sentences: string[]): string[] {
	return sentences.reduce<string[]>((acc, sentence, index, arr) => {
		if (index % 2 === 0) {
			const pair = arr[index + 1]
				? `${sentence}. ${arr[index + 1]}.`
				: `${sentence}.`;
			acc.push(pair);
		}
		return acc;
	}, []);
}

export function parseInstructions(instructions: string): string[] {
	const sentences = instructions
		.split(/\./)
		.map(cleanSentence)
		.filter((step) => step.length > 0);

	return pairSentences(sentences).map(convertTemperatures);
}
