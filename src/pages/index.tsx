import React, { useState, useEffect } from "react";

import Head from "next/head";

import styles from "../styles/Home.module.scss";

import { useQuestions } from "../hooks/useQuestions";

import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "@mui/material/Link";

export default function Home() {
  const { questions, answers } = useQuestions();

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

            <a href="#" className={styles.activity}>Report</a>
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html: question.question,
                    }}
                  />
                  {newAnswerse.map((answer, index) => {
                    return <h2 key={index}>{answer}</h2>;
                  })}
                </React.Fragment>
              );
            })}
        </main>
      </header>
    </>
  );
}
