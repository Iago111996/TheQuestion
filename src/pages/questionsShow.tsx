import { useState, useEffect } from "react";

import Link from "next/link";

import styles from "../styles/QuestionsShow.module.scss";

import { useQuestions } from "../hooks/useQuestions";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function QuestionsShow() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [newAnswers, setNewAnswers] = useState<string[]>([]);

  const [score, setScore] = useState(false);

  const { questions, answers, setAnswers } = useQuestions();

  function handleAnswer(answer: string) {
    setAnswers([...answers, answer]);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScore(true);
    }
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
      {!score ? (
        questions.length > 0 ? (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <h2>
                Questão {currentQuestion + 1}/{questions.length}//
                {answers}
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
                      onClick={() => handleAnswer(answer)}
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
            <h2>you got 5 out of 5</h2>
          </CardContent>

          <CardActions>
            <div className={styles.divFlex}>
              <Link href={'/results'}>
              <Button type="button" className={styles.detailsButton}>
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