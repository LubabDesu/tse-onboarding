import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Page, UserTag, TaskForm } from "src/components";

import styles from "./TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formatDate = (dateString: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (id) {
      getTask(id)
        .then((result) => {
          if (result.success) {
            setTask(result.data);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => setNotFound(true));
    }
  }, [id]);
  if (!task) {
    return (
      <Page>
        <p>Loading...</p>
      </Page>
    ); // Handle the "null" state while fetching
  }

  if (isEditing) {
    return (
      <Page>
        <TaskForm
          mode="edit"
          task={task}
          onSubmit={(updatedTask) => {
            setTask(updatedTask); // Update the local state with the new data
            setIsEditing(false); // Switch back to "View Mode"
          }}
        />
      </Page>
    );
  }
  return (
    <Page>
      <title>Task Detail</title> {/* Title HTML tag as requested */}
      <div className={styles.pageContainer}>
        <Link to="/" className={styles.backLink}>
          &lt; About this task
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>{task.title}</h1>
          {/* "Edit task" button */}
          <button type="button" className={styles.editButton} onClick={() => setIsEditing(true)}>
            Edit task
          </button>
        </div>

        <div className={styles.infoContainer}>
          {/* Description */}
          <div className={styles.infoRow}>
            <span className={styles.label}>Description</span>
            <div className={styles.value}>
              {task.description ? task.description : <em>No description provided</em>}
            </div>
          </div>

          {/* Assignee */}
          <div className={styles.infoRow}>
            <span className={styles.label}>Assignee</span>
            <div className={styles.value}>
              <UserTag userName={task.assignee.name} />
            </div>
          </div>

          {/* Status */}
          <div className={styles.infoRow}>
            <span className={styles.label}>Status</span>
            <div className={styles.value}>
              {/* Conditional styling based on status */}
              <span className={task.isChecked === true ? styles.statusDone : styles.statusTodo}>
                {/* You can add a text dot here if you want like "• " */}
                {task.isChecked}
              </span>
            </div>
          </div>

          {/* Date Created */}
          <div className={styles.infoRow}>
            <span className={styles.label}>Date created</span>
            <div className={styles.value}>{formatDate(task.dateCreated)}</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
