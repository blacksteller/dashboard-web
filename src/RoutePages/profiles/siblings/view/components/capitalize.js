/**
 * Get the text as parameter and capitalize it,
 * @param {string} t
 * @returns Capitalized Text : String
 */
export const capitalize = (t) => {
	const firstLetter = t.charAt(0);
	const remainingLetters = t.slice(1, t.length);

	const capitalizedText =
		firstLetter.toUpperCase() + remainingLetters.toLowerCase();

	return capitalizedText;
};
