import TaskFilters from "@/features/task-filters/ui";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

import styles from "./TaskToobar.module.css";

const TaskToolbar = () => {
  return (
    <Row justify="space-between">
      <Col span={16}>
        <TaskFilters />
      </Col>
      <Col span={2}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          className={styles.createButton}
        >
          Create Task
        </Button>
      </Col>
    </Row>
  );
};

export default TaskToolbar;
