import React, { useEffect, useState } from "react";
import styles from "./css/userDisplay.module.scss";
import axios from "axios";

export default function UserDisplay() {
  const { REACT_APP_BACKEND_URL } = process.env;
  const [username, setUsername] = useState();

  const fetchUserSummaryData = () => {
    const URL = `${REACT_APP_BACKEND_URL}/userSummaryData`;
    axios
      .get(URL, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  useEffect(() => {
    fetchUserSummaryData();
  }, []);
  return (
    <div className={styles.userDisplayContainer}>
      <div className={styles.userPhotoSection}></div>
      <h3>Hello, {username}</h3>
      <h2> Last 30 days Summary</h2>
      <div className={styles.summary}>
        <div>
          <h3>Good Yes</h3>
          <h5 className={styles.center}> value</h5>
        </div>
        <div>
          <h3>Good No</h3>
          <h5 className={styles.center}> value</h5>
        </div>
        <div>
          <h3>Bad Yes</h3>
          <h5 className={styles.center}> value</h5>
        </div>
        <div>
          <h3>Good Yes</h3>
          <h5 className={styles.center}> value</h5>
        </div>
      </div>
    </div>
  );
}
