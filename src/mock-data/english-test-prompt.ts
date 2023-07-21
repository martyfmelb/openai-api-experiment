type EnglishTestPromptParams = {
  sourceMaterial: string;
  questions: string;
  correctAnswers: string;
  studentAnswers: string;
};

export const englishTestPrompt = ({
  sourceMaterial,
  questions,
  correctAnswers,
  studentAnswers,
}: EnglishTestPromptParams) => `
  The following three blocks (denoted by "--- BEGIN <BLOCK NAME> ---" and "--- END <BLOCK NAME> ---") together form a test for students, and you are assessing the results.

  The students are 9 year olds. The test is about Grade 3 English.
  The blocks are:
  - Source material
- Questions about the source material
- The correct answers
- The answers submitted for the test by the student

To assess the results, create a table where, for each row for each question about the source material, use these columns:
  - "question" (including question number)
- "correctAnswer"
- "studentAnswer"
- "isCorrect?" (use ✅ for correct, ❌ for incorrect)
  - "notes", for notes to improve.

  Convert above table to JSON structure
{
\t"testQuestionsWithAnswers": [
\t\t{
\t\t\t"question": "..",
\t\t\t"correctAnswer": "..",
\t\t\t"studentAnswer": "..",
\t\t\t"isCorrect": "..",
\t\t\t"notes": ""
\t\t}
\t]
}
Where the question asks to "circle" or "underline" the correct answer, it just means the student should write the correct answer from the list provided in that question.
  Where the question asks to "write sentences" and answer says something like, "your child should...", it doesn't mean the answer should actually be about a child, it is actually a general description of what the student should have done for the answer.
Where the question asks for visual assessment, such as writing something in cursive, leave the "Correct?" column blank so a teacher can fill it in later.
--- BEGIN SOURCE MATERIAL ---
${sourceMaterial}
--- END SOURCE MATERIAL ---
--- BEGIN QUESTIONS ABOUT THE SOURCE MATERIAL ---
${questions}
--- END QUESTIONS ABOUT THE SOURCE MATERIAL ---
--- BEGIN CORRECT ANSWERS ---
${correctAnswers}
--- END CORRECT ANSWERS ---
--- BEGIN STUDENT ANSWERS ---
${studentAnswers}
--- END STUDENT ANSWERS ---
`;
