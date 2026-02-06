import TaskFilters from "@/features/task-filters/ui";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row } from "antd";

import styles from "./TaskToobar.module.css";
import TaskForm from "@/features/task-create-edit/ui/TaskForm";
import { useState } from "react";
import { useCreateTaskMutation } from "@/entities/task/model/task.api";
import type { TaskFormValues } from "@/entities/task/model/task.type";

const TaskToolbar = () => {
  const [open, setOpen] = useState(false);

  const [createTask] = useCreateTaskMutation();

  const onClick = () => {
    setOpen(true);
  };

  const onSubmit = async (values: TaskFormValues) => {
    try {
      await createTask(values).unwrap();
      message.success("Task is created");
    } catch {
      message.error("Error while creating task");
    } finally {
      setOpen(false);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            onClick={onClick}
          >
            Create Task
          </Button>
        </Col>
      </Row>
      <Modal open={open} footer={null} centered onCancel={onClose}>
        <TaskForm onCancel={onClose} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default TaskToolbar;
