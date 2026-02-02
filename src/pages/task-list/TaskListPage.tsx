import { Layout } from "antd";
import Header from "@/widgets/header";

import styles from "./styles.module.css";

const TaskListPage = () => {
  return (
    <Layout className={styles.root}>
      <Header />
    </Layout>
  );
};

export default TaskListPage;
