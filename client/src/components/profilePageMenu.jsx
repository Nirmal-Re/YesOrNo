import styles from "./css/profilePageMenu.module.scss";
import AccountSettings from "./accountSettings";
import PasswordSettings from "./passwordSettings";
import UserPhoto from "./userPhoto";

import React, { useState } from "react";

export default function ProfilePageMenu() {
  const [activeComponent, setActiveComponent] = useState("AccountSettings");
  return (
    <>
      <div className={styles.profileInfoContainer}>
        <table className={styles.left}>
          <tr className={styles.tableRow}>
            <UserPhoto />
          </tr>
          <tr className={styles.tableRow}>
            <button
              className={styles.buttons}
              onClick={(e) => setActiveComponent(e.target.value)}
              value="AccountSettings"
            >
              Account Settings
            </button>
          </tr>
          <tr className={styles.tableRow}>
            <button
              className={styles.buttons}
              onClick={(e) => setActiveComponent(e.target.value)}
              value="PasswordSettings"
            >
              Password Settings
            </button>
          </tr>
        </table>
        <div className={styles.right}>
          {activeComponent === "AccountSettings" && <AccountSettings />}
          {activeComponent === "PasswordSettings" && <PasswordSettings />}
        </div>
      </div>
    </>
  );
}
