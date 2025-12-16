import { Dialog } from "@tritonse/tse-constellation";
import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export type TaskListProps = {
  title: string;
};

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      const results = await getAllTasks();
      if (results.success) {
        setTasks(results.data);
      } else {
        setErrorModalMessage(results.error);
      }
    }
    loadTasks().catch((err) => {
      console.error("error loading tasks : ", err);
    });
  }, []);

  return (
    <div>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          <ul className={styles.itemContainer}>
            {tasks.map((task) => (
              <li key={task._id} className={styles.item}>
                {" "}
                <TaskItem task={task} />{" "}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog
        styleVersion="styled"
        variant="error"
        title="An error occurred"
        // Override the text color so it doesn't show white text on a white background
        content={<p className={styles.errorModalText}>{errorModalMessage}</p>}
        isOpen={errorModalMessage !== null}
        onClose={() => setErrorModalMessage(null)}
      />
      ;
    </div>
  );
}
