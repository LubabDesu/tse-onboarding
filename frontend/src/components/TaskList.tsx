import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export type TaskListProps = {
  title: string;
};

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void getAllTasks().then((result) => {
      if (result.success) {
        setTasks(result.data);
      } else {
        console.error(result.error);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <div>
        {tasks.length === 0 ? (
          <p className={styles.emptyMessage}>No tasks yet. Create one above!</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
