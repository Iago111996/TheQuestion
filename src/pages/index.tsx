import React, { useState, useEffect } from "react";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.scss";

import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface Report {
  id: string;
  date: string;
  report: string;
}

export default function Home() {
  const [reports, setReport] = useState<Report[]>([]);

  function loadReports() {
    const dataKey = "@thequestion:report";
    const response = localStorage.getItem(dataKey);
    const data = response ? JSON.parse(response) : [];

    setReport(data);
  }

  function handleDelete(id: string) {
    setReport((prevState) => {
      if (prevState.some((response) => response.id == id)) {
        return prevState.filter((response) => response.id != id);
      }
    });

    const dataKey = "@thequestion:report";
    const data = localStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];

    const dataFormated = currentData.filter(
      (response: Report) => response.id != id
    );

    localStorage.setItem(dataKey, JSON.stringify(dataFormated));
  }

  useEffect(() => {
    loadReports();
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

            <a href="#" className={styles.activity}>
              Report
            </a>
          </div>

          <Link href="/chooseQuantity" passHref={true}>
            <Button className={styles.buttonNew} type="button">
              New game
            </Button>
          </Link>
        </div>
      </header>

      <main className={styles.mainContainer}>
        {reports.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Results</th>
              </tr>
            </thead>

            <tbody>
              {reports?.map((report) => {
                return (
                  <tr key={report.id}>
                    <td>{moment(report.date).format("LLL")}</td>
                    <td>
                      <section>
                        {report.report}
                        <Button
                          type="button"
                          onClick={() => handleDelete(report.id)}
                        >
                          Delete
                        </Button>
                      </section>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <h2>You don't have any results...</h2>
            <h2>Star a new game!</h2>
          </div>
        )}
      </main>
    </>
  );
}
