import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Results.module.scss";

import { useQuestions } from "../hooks/useQuestions";

import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Home() {
  const { questions, answers } = useQuestions();

  return (
    <>
      <Head>
        <title>Results | TheQuestion</title>
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

            <Link href="/" passHref={true}>
              <a>Report</a>
            </Link>

            <Link href="#" passHref={true}>
              <a className={styles.activity}>Results</a>
            </Link>
          </div>

          <Link href="/chooseQuantity" passHref={true}>
            <Button type="button" className={styles.buttonNew}>
              <a>New game</a>
            </Button>
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
                    <span>{index + 1}</span>
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
