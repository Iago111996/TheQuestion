import styles from "../styles/ChooseQuantity.module.scss";
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className={styles.divBorder}>
            <h2>Choose the number of questions you want to answer.</h2>
          </div>
          <Input
            type="number"
            margin="dense"
            placeholder="Number here"
            autoFocus={true}
            // value={numberQuestions}
            onChange={(e) => setNumberQuestions(+e.target.value)}
          />
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

            <Link href="/">
              <Button className={styles.endButton} type="button">
                <a>GoBack</a>
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    </main>
  );
}
