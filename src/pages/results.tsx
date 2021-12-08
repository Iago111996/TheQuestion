import React, { useState, useEffect } from "react";

import Head from "next/head";

import styles from "../styles/Results.module.scss";

import { useQuestions } from "../hooks/useQuestions";

import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "@mui/material/Link";

export default function Home() {
  const { questions, answers } = useQuestions();

  useEffect(() => {
    console.log(answers);
  }, []);

  return (
    <>
      <Head>
        <title>Report | TheQuestion</title>
      </Head>

      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div>
            <h1>
              <span>
                <HelpOutlineIcon />
              </span>
              TheQuestion
            </h1>

            <a href="/">Report</a>
            <a href="#" className={styles.activity}>
              Results
            </a>
          </div>

          <Link href="/chooseQuantity" color="inherit" underline="none">
            <Button type="button">New game</Button>
          </Link>
        </div>
        <main className={styles.mainContainer}>
          {questions &&
            questions.map((question, index) => {
              const newAnswerse = [
                questions[index].correct_answer,
                ...questions[index].incorrect_answers,
              ];

              return (
                <React.Fragment key={index}>
                  <div className={styles.divFlex}>
                    <span>{index +1}</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: question.question,
                      }}
                    />
                  </div>

                  {newAnswerse.map((answer, index) => {
                    const chosen = answers.some((x) => x === answer);
                    const right = index === 0;

                    return (
                      <h2
                        key={index}
                        className={
                          right ? styles.right : chosen ? styles.chosen : ""
                        }
                        dangerouslySetInnerHTML={{
                          __html: answer,
                        }}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
        </main>
      </header>
    </>
  );
}
