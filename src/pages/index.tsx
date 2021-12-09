import React, { useState, useEffect } from "react";
import moment from "moment";
import Head from "next/head";

import styles from "../styles/Home.module.scss";

import { useQuestions } from "../hooks/useQuestions";

import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "@mui/material/Link";

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
    console.log("to na fucao");

    setReport(data);
  }

  useEffect(() => {
    loadReports();
    console.log(reports);
    console.log("oi");
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

          <Link href="/chooseQuantity" color="inherit" underline="none">
            <Button type="button">New game</Button>
          </Link>
        </div>

        <main className={styles.mainContainer}>
          {reports ? (
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
                      <td>{report.report}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <h2>you don't have any results...</h2>
            </div>
          )}
        </main>
      </header>
    </>
  );
}
