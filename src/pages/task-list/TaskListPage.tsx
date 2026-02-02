import { Layout } from "antd";
import Header from "@/widgets/header";

import styles from "./styles.module.css";
import TaskToolbar from "@/widgets/task-toolbar";

const TaskListPage = () => {
  return (
    <Layout className={styles.root}>
      <Header />
      <TaskToolbar />
    </Layout>
  );
};

export default TaskListPage;
