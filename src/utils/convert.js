export const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  } else {
    return text;
  }
};

export function shortenSentence(sentence, n) {
  // If the sentence is already shorter than n characters, return it as is
  if (sentence.length <= n) {
    return sentence;
  }

  // Find the nearest whole word boundary before the n-th character
  let boundaryIndex = n;
  while (boundaryIndex > 0 && !/\s/.test(sentence[boundaryIndex])) {
    boundaryIndex--;
  }

  // If the boundary is at the beginning of the sentence, return an empty string
  if (boundaryIndex === 0) {
    return '';
  }

  // Shorten the sentence to the boundary, trim any trailing whitespace, and add an ellipsis
  return sentence.slice(0, boundaryIndex).trim() + '…';
}
