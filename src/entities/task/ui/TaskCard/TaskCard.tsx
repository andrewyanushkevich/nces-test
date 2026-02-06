import {
  TASK_PRIORITY_LABELS,
  TASK_STATUSE_KEYS,
  TASK_STATUSE_LABELS,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@entities/task/model/task.type";
import { Card, Select, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import type { FC } from "react";

import styles from "./TaskCard.module.css";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useUpdateStatusMutation } from "../../model/task.api";
import { useDispatch } from "react-redux";
import { setFilters } from "@/features/task-filters/model/taskFilterSlice";

const { Title, Text, Paragraph } = Typography;

const statusOptions = TASK_STATUSE_KEYS.map((key) => ({
  value: key,
  label: TASK_STATUSE_LABELS[key],
}));

interface TaskCardProps {
  task: Task;
}

const TAG_COLORS: Record<TaskPriority, string> = {
  low: "green",
  medium: "orange",
  high: "red",
};

const TaskCard: FC<TaskCardProps> = (props) => {
  const { task } = props;

  const navigate = useNavigate();

  const [updateStatus] = useUpdateStatusMutation();

  const dispatch = useDispatch();

  const isOverdue =
    dayjs(task.deadline).isBefore(dayjs(), "day") && task.status !== "done";

  const onClick = () => {
    navigate(`task/${task.id}`);
  };

  const onChangeStatus = (value: TaskStatus) => {
    updateStatus({
      id: task.id,
      payload: { status: value },
    });
  };

  const onTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setFilters({ tags: tag }));
  };

  return (
    <Card
      hoverable
      className={`${styles.card} ${isOverdue ? styles.cardOverdue : ""}`}
      onClick={onClick}
    >
      <div
        style={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Space>
            <Tag color={TAG_COLORS[task.priority]}>
              {TASK_PRIORITY_LABELS[task.priority]}
            </Tag>
          </Space>
          <Select
            value={task.status}
            onChange={onChangeStatus}
            options={statusOptions}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <Title level={5} style={{ marginTop: 12 }}>
          {task.title}
        </Title>
        <Paragraph ellipsis={{ rows: 2 }} type="secondary">
          {task.description}
        </Paragraph>
        <div style={{ margin: "12px 0" }}>
          {task.tags.map((tag) => (
            <Tag key={tag} color="blue" onClick={onTagClick(tag)}>
              {tag}
            </Tag>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #f0f0f0",
            paddingTop: 12,
          }}
        >
          <Text type={isOverdue ? "danger" : "secondary"} strong={isOverdue}>
            <ClockCircleOutlined /> {dayjs(task.deadline).format("DD.MM.YY")}
          </Text>
          <Tag
            color={
              task.status === "done"
                ? "success"
                : task.status === "inProgress"
                ? "processing"
                : "default"
            }
          >
            {TASK_STATUSE_LABELS[task.status]}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
