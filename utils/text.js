// A text split after its first sentence: [first sentence, the rest]. Used
// where a section is set as on About, headed in capitals by the first
// sentence of its text.
export const splitFirstSentence = (text) => {
  const m = text.match(/^(.+?[.!?])\s+([\s\S]+)$/)
  return m ? [m[1], m[2]] : [text, '']
}
