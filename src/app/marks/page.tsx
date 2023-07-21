"use client";
import Typography from "@mui/material/Typography";
import testData from "../../mock-data/jessica-smith.json";
import { Avatar, Button } from "@mui/material";
import styles from "./page.module.scss";
import axios from "axios";

import { questions, sourceMaterial, studentAnswers, correctAnswers } from "@/mock-data/english-test";
import { englishTestPrompt } from "@/mock-data/english-test-prompt";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import mockResponse from "../../mock-data/english-test-mock-azure-openai-response.json";

export default function Marks() {
  const multilinify = (s: string) =>
    s.split("<br>").map((line, index) => (
      <>
        {line}
        <br />
      </>
    ));

  const filledPrompt = englishTestPrompt({ questions, sourceMaterial, studentAnswers, correctAnswers });

  const postTestResultsAndGetMarked = () => {
    // return axios
    //   .post<{ data: OpenAiChatCompletionsResponse }>("/api/chat", {
    //     messages: chatItemsToOpenAiMessages([
    //       {
    //         id: new Date().toISOString(),
    //         role: "system",
    //         content: filledPrompt,
    //       },
    //     ]),
    //   })
    //   .then((res) => {
    //     testData.testQuestionsWithAnswers = JSON.parse((res.data.data.choices[0].message.content));
    //   });
    console.log(JSON.parse(mockResponse.data.choices[0].message.content));
    setTestQuestionsWithAnswers(JSON.parse(mockResponse.data.choices[0].message.content).testQuestionsWithAnswers);
  };

  // const questionsRef = useRef<HTMLTextAreaElement>(null);
  // const sourceMaterialRef = useRef<HTMLTextAreaElement>(null);
  // const studentAnswersRef = useRef<HTMLTextAreaElement>(null);
  // const correctAnswersRef = useRef<HTMLTextAreaElement>(null);
  //
  // const [questions, setQuestions] = useLocalStorage("questions", props.initialValue);
  // const [sourceMaterial, setSourceMaterial] = useLocalStorage("sourceMaterial", props.initialValue);
  // const [studentAnswers, setStudentAnswers] = useLocalStorage("studentAnswers", props.initialValue);
  // const [correctAnswers, setCorrectAnswers] = useLocalStorage("correctAnswers", props.initialValue);

  const [testQuestionsWithAnswers, setTestQuestionsWithAnswers] = useState([]);

  return (
    <div className={styles.pager}>
      <div className={styles.testPage}>
        {/*<div>*/}
        {/*  questions: <TextField inputRef={questionsRef} label="Outlined" variant="outlined" fullWidth multiline />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  sourceMaterial:{" "}*/}
        {/*  <TextField inputRef={sourceMaterialRef} label="Outlined" variant="outlined" fullWidth multiline />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  studentAnswers:{" "}*/}
        {/*  <TextField inputRef={studentAnswersRef} label="Outlined" variant="outlined" fullWidth multiline />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  correctAnswers:{" "}*/}
        {/*  <TextField inputRef={correctAnswersRef} label="Outlined" variant="outlined" fullWidth multiline />*/}
        {/*</div>*/}
        <Button onClick={() => postTestResultsAndGetMarked(filledPrompt)}>Submit test</Button>
      </div>
      <div className={styles.resultsPage}>
        <div className={styles.studentBlock}>
          <Avatar src={"/jessica-smith.jpg"} sx={{ width: 128, height: 128 }}></Avatar>
          <Typography variant="h4">Name: {testData.studentName}</Typography>
          <Typography variant="h5">Class: {testData.class}</Typography>
          <Typography variant="h5">Subject: {testData.subject}</Typography>
          <Typography variant="h3">
            Mark: {testData.studentMarks} / {testData.totalMarks}
          </Typography>
        </div>
        <div className={styles.questionsAndAnswers}>
          {testQuestionsWithAnswers.map((item, index) => (
            <div key={index} className={styles.questionAndAnswer}>
              <span className={styles.isCorrect}>{item.isCorrect}</span>
              <Typography variant="h5" className={styles.question}>
                {multilinify(item.question)}
              </Typography>
              <Typography variant="body1" className={styles.correctAnswer}>
                {multilinify(item.correctAnswer)}
              </Typography>
              <Typography variant="body1" className={styles.studentAnswer}>
                {multilinify(item.studentAnswer)}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
