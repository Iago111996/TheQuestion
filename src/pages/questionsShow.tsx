import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/QuestionsShow.module.scss";

import { useQuestions } from "../hooks/useQuestions";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function QuestionsShow() {
  const [responseQuestion, setResponseQuestion] = useState<number[]>([]);
  const [newAnswers, setNewAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(false);

  const { questions, answers, setAnswers } = useQuestions();

  const right = responseQuestion.filter((index) => index === 0);

  function handleAnswer(answer: string, index: number) {
    setAnswers([...answers, answer]);
    setResponseQuestion((prevState) => [...prevState, index]);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScore(true);
    }
  }

  function handleRegisterResponse(results: string) {
    const newGame = {
      id: uuidv4(),
      date: new Date(),
      report: results,
    };

    const dataKey = "@thequestion:report";
    const data = localStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];

    const dataFormated = [...currentData, newGame];

    localStorage.setItem(dataKey, JSON.stringify(dataFormated));
  }

  useEffect(() => {
    if (questions.length > 0) {
      setNewAnswers([
        questions[currentQuestion].correct_answer,
        ...questions[currentQuestion].incorrect_answers,
      ]);
    }
  }, [questions, currentQuestion]);

  return (
    <main className={styles.contentContainer}>
      <Head>
        <title>Questions | TheQuestion</title>
      </Head>

      {!score ? (
        questions.length > 0 ? (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <h2>
                Questão {currentQuestion + 1}/{questions.length}
              </h2>

              <p
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestion].question,
                }}
              />
            </CardContent>

            <CardActions>
              <div className={styles.divContent}>
                {newAnswers.map((answer, index) => {
                  return (
                    <Button
                      key={index}
                      type="button"
                      className={styles.startButton}
                      onClick={() => handleAnswer(answer, index)}
                    >
                      {answer}
                    </Button>
                  );
                })}
              </div>
            </CardActions>
          </Card>
        ) : (
          <h1>Loading...</h1>
        )
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <h2>
              you got {right.length} out of {questions.length} questions
            </h2>
          </CardContent>

          <CardActions>
            <div className={styles.divFlex}>
              <Link href={"/results"} passHref={true}>
                <Button
                  type="button"
                  className={styles.detailsButton}
                  onClick={() => handleRegisterResponse(`you got ${right.length} out of ${questions.length} questions`)}
                >
                  Click here for more details
                </Button>
              </Link>
            </div>
          </CardActions>
        </Card>
      )}
    </main>
  );
}
