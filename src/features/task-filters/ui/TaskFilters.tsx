import {
  TASK_PRIORITY_KEYS,
  TASK_PRIORITY_LABELS,
  TASK_STATUSE_KEYS,
  TASK_STATUSE_LABELS,
} from "@/entities/task/model/task.type";
import { Col, Row, Select } from "antd";
import Search from "antd/es/transfer/search";

import styles from "./TaskFilters.module.css";
import { useGetTagsQuery } from "@/entities/tag/model/tag.api";

const statusOptions = [
  { key: "all", value: "All" },
  ...TASK_STATUSE_KEYS.map((key) => ({
    key,
    value: TASK_STATUSE_LABELS[key],
  })),
];

const priorityOptions = TASK_PRIORITY_KEYS.map((priority) => ({
  key: priority,
  value: TASK_PRIORITY_LABELS[priority],
}));

const TaskFilters = () => {
  const { data } = useGetTagsQuery();

  const tagOptions = data?.map((tag) => ({
    key: tag.id,
    value: tag.name,
  }));

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={6}>
        <Search placeholder="Search task" />
      </Col>
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={statusOptions}
          defaultValue="All"
          placeholder="Filter by status"
        />
      </Col>
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={priorityOptions}
          defaultValue="All"
          placeholder="Filter by status"
        />
      </Col>
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={tagOptions}
          placeholder="Filter by tag"
        />
      </Col>
    </Row>
  );
};

export default TaskFilters;
