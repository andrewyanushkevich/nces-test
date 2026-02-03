import {
  TASK_PRIORITY_LABELS,
  TASK_STATUSE_LABELS,
  type Task,
  type TaskPriority,
} from "@entities/task/model/task.type";
import { Button, Card, Dropdown, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import type { FC } from "react";

import styles from "./TaskCard.module.css";
import { ClockCircleOutlined, MoreOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

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

  const isOverdue =
    dayjs(task.deadline).isBefore(dayjs(), "day") && task.status !== "done";

  return (
    <Card
      hoverable
      className={`${styles.card} ${isOverdue ? styles.cardOverdue : ""}`}
      // onClick={() => setView({ type: 'detail', id: task.id })}
    >
      <div
        style={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Space>
            <Tag color={TAG_COLORS[task.priority]}>
              {TASK_PRIORITY_LABELS[task.priority]}
            </Tag>
          </Space>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: Object.values(TASK_STATUSE_LABELS).map((label) => ({
                label,
                type: "item",
                key: label,
              })),
            }}
          >
            <Button type="dashed" onClick={(e) => e.stopPropagation()}>
              Change status
            </Button>
          </Dropdown>
        </div>
        <Title level={5} style={{ marginTop: 12 }}>
          {task.title}
        </Title>
        <Paragraph ellipsis={{ rows: 2 }} type="secondary">
          {task.description}
        </Paragraph>
        <div style={{ margin: "12px 0" }}>
          {task.tags.map((tag) => (
            <Tag
              key={tag}
              color="blue"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   setTagFilter(tag);
              // }}
            >
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
