import { Dialog } from "@tritonse/tse-constellation";
import React, { useState, useEffect } from "react"; // update this line
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const checked = task.isChecked;
  const title = task.title;
  const description = task.description;

  let checkedStyle = styles.textContainer;
  if (checked) {
    checkedStyle += ` ${styles.checked}`;
  }

  const handleToggleCheck = async () => {
    // your code here
    setLoading(true);
    try {
      const result = await updateTask({ ...task, isChecked: !task.isChecked });

      if (result.success) {
        setTask(result.data);
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.item}>
      <CheckButton
        checked={checked}
        onPress={() => void handleToggleCheck()}
        disabled={isLoading}
      />
      <Link to={`/task/${task._id}`} className={checkedStyle}>
        <span className={styles.title}>{title}</span>
        {task.description && <span className={styles.description}>{description}</span>}
      </Link>
      <Dialog
        styleVersion="styled"
        variant="error"
        title="Error updating task"
        isOpen={error !== null}
        onClose={() => setError(null)}
        content={<p>{error}</p>}
      />
    </div>
  );
}
