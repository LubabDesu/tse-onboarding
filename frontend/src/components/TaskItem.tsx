import React from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const checked = task.isChecked;
  const title = task.title;
  const description = task.description;

  let checkedStyle = styles.textContainer;
  if (checked) {
    checkedStyle += ` ${styles.checked}`;
  }
  return (
    <div className={styles.item}>
      <CheckButton checked={checked} />
      <div className={checkedStyle}>
        <span className={styles.title}>{title}</span>
        {task.description && <span className={styles.description}>{description}</span>}
      </div>
    </div>
  );
}
