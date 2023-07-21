"use client";
import Typography from "@mui/material/Typography";
import testData from "../../mock-data/jessica-smith.json";
import { Avatar, Button } from "@mui/material";
import styles from "./page.module.scss";
import axios from "axios";

import { englishTestPrompt } from "@/mock-data/english-test-prompt";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import { OpenAiChatCompletionsResponse } from "@/types/OpenAiChatCompletionsResponse";
import { chatItemsToOpenAiMessages } from "@/mappers/chatItemsToOpenAiMessages";

export default function Marks() {
  const multilinify = (s: string) =>
    s.split("<br>").map((line, index) => (
      <>
        {line}
        <br />
      </>
    ));

  const questionsRef = useRef<HTMLTextAreaElement>(null);
  const sourceMaterialRef = useRef<HTMLTextAreaElement>(null);
  const studentAnswersRef = useRef<HTMLTextAreaElement>(null);
  const correctAnswersRef = useRef<HTMLTextAreaElement>(null);

  const [questions, setQuestions] = useLocalStorage("questions", "");
  const [sourceMaterial, setSourceMaterial] = useLocalStorage("sourceMaterial", "");
  const [studentAnswers, setStudentAnswers] = useLocalStorage("studentAnswers", "");
  const [correctAnswers, setCorrectAnswers] = useLocalStorage("correctAnswers", "");

  const postTestResultsAndGetMarked = () => {
    setIsShowingLoader(true);
    return axios
      .post<{ data: OpenAiChatCompletionsResponse }>("/api/chat", {
        messages: chatItemsToOpenAiMessages([
          {
            id: new Date().toISOString(),
            role: "system",
            content: englishTestPrompt({ questions, sourceMaterial, studentAnswers, correctAnswers }),
          },
        ]),
      })
      .then((res) => {
        setIsShowingLoader(false);
        setIsShowingTestPage(false);
        setIsShowingResultsPage(true);
        setTestQuestionsWithAnswers(JSON.parse(res.data.data.choices[0].message.content).testQuestionsWithAnswers);
      });
  };

  const [testQuestionsWithAnswers, setTestQuestionsWithAnswers] = useState([]);

  const [isShowingTestPage, setIsShowingTestPage] = useState<boolean>(true);
  const [isShowingResultsPage, setIsShowingResultsPage] = useState<boolean>(false);
  const [isShowingLoader, setIsShowingLoader] = useState<boolean>(false);

  return (
    <div className={styles.pager}>
      <div className={styles.testPage} style={{ display: isShowingTestPage ? "" : "none" }}>
        <Typography variant="h3">{testData.testName}</Typography>
        <div className={styles.field}>
          <Typography variant="h5">Source Material:</Typography>
          <TextField
            inputRef={sourceMaterialRef}
            onChange={(e) => setSourceMaterial(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
          />
        </div>
        <div className={styles.field}>
          <Typography variant="h5">Questions:</Typography>
          <TextField
            inputRef={questionsRef}
            onChange={(e) => setQuestions(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
          />
        </div>
        <div className={styles.field}>
          <Typography variant="h5">Correct answers:</Typography>
          <TextField
            inputRef={correctAnswersRef}
            onChange={(e) => setCorrectAnswers(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
          />
        </div>
        <div className={styles.field}>
          <Typography variant="h5">Student answers:</Typography>
          <TextField
            inputRef={studentAnswersRef}
            onChange={(e) => setStudentAnswers(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
          />
        </div>
        <br />
        <Button variant="contained" onClick={() => postTestResultsAndGetMarked()}>
          Submit test
        </Button>
      </div>
      <div style={{ display: isShowingLoader ? "" : "none" }}>
        <img src="/loading-icon.gif" />
      </div>
      <div className={styles.resultsPage} style={{ display: isShowingResultsPage ? "" : "none" }}>
        <div className={styles.studentBlock}>
          <Avatar src={"/jessica-smith.jpg"} sx={{ width: 128, height: 128 }}></Avatar>
          <Typography variant="h4">Name: {testData.studentName}</Typography>
          <Typography variant="h5">Class: {testData.class}</Typography>
          <Typography variant="h5">Subject: {testData.subject}</Typography>
        </div>
        <Typography variant="h3">{testData.testName}</Typography>
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
              {!item.notes?.length ? null : (
                <div className={styles.notes}>
                  <Typography variant="body1">
                    <strong>Notes</strong>
                  </Typography>
                  <Typography variant="body1">{multilinify(item.notes)}</Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
