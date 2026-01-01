import React from "react";

import styles from "./UserTag.module.css";

export type UserTagProps = {
  userName?: string;
  className?: string;
};

export function UserTag({ userName, className }: UserTagProps) {
  if (!userName) {
    return <div className={`${styles.notAssigned} ${className || ""}`}>Not assigned</div>;
  } else {
    return (
      <div className={`${styles.container} ${className || ""}`}>
        <img src="/userDefault.png" className={styles.avatar} />
        <span className={styles.userName}>{userName}</span>
      </div>
    );
  }
}
