import styles from "../styles/Choose.module.scss";
import Head from "next/head";
import Link from "next/link";

import { useQuestions } from "../hooks/useQuestions";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
// import Link from "@mui/material/Link";

export default function ChooseQuantity() {
  const { questions, numberQuestions, setNumberQuestions, loadQuestions } =
    useQuestions();

  return (
    <main className={styles.contentContainer}>
      <Head>
        <title>Choose | TheQuestion</title>
      </Head>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className={styles.divBorder}>
            <h2>Are you sure you want to continue?</h2>
          </div>
        </CardContent>

        <CardActions>
          <div className={styles.divFlex}>
            <Link href={numberQuestions > 0 ? "/questionsShow" : "#"}>
              <Button
                className={styles.startButton}
                type="button"
                onClick={numberQuestions !== 0 ? loadQuestions : null}
              >
                <a>Star</a>
              </Button>
            </Link>

            <Link href="/chooseQuantity">
              <Button className={styles.endButton} type="button">
                <a>Cancel</a>
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    </main>
  );
}
