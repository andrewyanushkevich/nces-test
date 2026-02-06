import {
  useEditTaskMutation,
  useGetTaskByIdQuery,
} from "@/entities/task/model/task.api";
import {
  TASK_STATUSE_LABELS,
  type TaskFormValues,
  type TaskPriority,
} from "@/entities/task/model/task.type";
import {
  Card,
  Tag,
  Typography,
  Space,
  Button,
  Empty,
  Badge,
  Modal,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EditOutlined,
  TagOutlined,
} from "@ant-design/icons";
import styles from "./TaskDetailesPage.module.css";
import DeleteTaskButton from "@/features/task-delete/ui/DeleteTaskButton";
import TaskForm from "@/features/task-create-edit/ui/TaskForm";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;

const priorityColors: Record<TaskPriority, string> = {
  low: "blue",
  medium: "orange",
  high: "red",
};

const TaskDetailsPage = () => {
  const { id } = useParams();
  const { data: task } = useGetTaskByIdQuery(id!);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [editTask] = useEditTaskMutation();

  const onClick = () => {
    setOpen(true);
  };

  const onSubmit = async (values: TaskFormValues) => {
    try {
      await editTask({ id: id!, payload: values }).unwrap();
      message.success("Task is edited");
    } catch {
      message.error("Error while creating task");
    } finally {
      setOpen(false);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  if (!task) {
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        <Empty description="Task is not found" />
        <Button style={{ marginTop: 16 }} onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
    );
  }

  const isOverdue =
    dayjs(task.deadline).isBefore(dayjs(), "day") && task.status !== "done";

  return (
    <div className={styles.container}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}
        className={styles.backButton}
        type="text"
      >
        Back
      </Button>
      <Card className={styles.card}>
        <Space className={styles.headerRow}>
          <div className={styles.headerCol}>
            <div className={styles.statusRow}>
              <Badge
                status={
                  task.status === "done"
                    ? "success"
                    : task.status === "inProgress"
                    ? "processing"
                    : "default"
                }
              />
              <Text
                strong
                style={{
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#a3a3a3",
                  fontSize: 10,
                }}
              >
                {TASK_STATUSE_LABELS[task.status]}
              </Text>
            </div>
            <Title level={1} style={{ marginTop: 0, marginBottom: 16 }}>
              {task.title}
            </Title>
            <div className={styles.tagRow}>
              {task.tags.map((tag) => (
                <Tag key={tag} color="blue" icon={<TagOutlined />}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <Space className={styles.actions}>
            <Button icon={<EditOutlined />} onClick={onClick}>
              Edit
            </Button>
            <Modal open={open} footer={null} centered onCancel={onClose}>
              <TaskForm task={task} onCancel={onClose} onSubmit={onSubmit} />
            </Modal>
            <DeleteTaskButton task={task} />
          </Space>
        </Space>
        <div className={styles.grid}>
          <div>
            <Paragraph className={styles.descText}>
              {task.description || "Нет описания."}
            </Paragraph>
          </div>
          <div className={styles.metaBox}>
            <div>
              <Text type="secondary" className={styles.metaLabel}>
                Priority
              </Text>
              <Tag color={priorityColors[task.priority]}>
                {task.priority.toUpperCase()}
              </Tag>
            </div>
            <div>
              <Text type="secondary" className={styles.metaLabel}>
                Deadline
              </Text>
              <div
                className={`${styles.deadlineRow} ${
                  isOverdue && styles.deadlineOverdue
                }`}
              >
                <CalendarOutlined />
                {dayjs(task.deadline).format("D MMMM YYYY")}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskDetailsPage;
