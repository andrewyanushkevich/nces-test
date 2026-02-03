import { Layout } from "antd";
import Header from "@/widgets/header";

import styles from "./styles.module.css";
import TaskToolbar from "@/widgets/task-toolbar";
import TaskBoard from "@/widgets/task-list";

const TaskListPage = () => {
  return (
    <Layout className={styles.root}>
      <Header />
      <TaskToolbar />
      <TaskBoard />
    </Layout>
  );
};

export default TaskListPage;
