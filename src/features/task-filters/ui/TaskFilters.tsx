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
import { setFilters } from "../model/taskFilterSlice";
import { useDispatch } from "react-redux";

interface OptionType {
  value: string;
  label: string;
}

const statusOptions: OptionType[] = [
  { value: "all", label: "All" },
  ...TASK_STATUSE_KEYS.map((key) => ({
    value: key,
    label: TASK_STATUSE_LABELS[key],
  })),
];

const priorityOptions: OptionType[] = [
  { value: "all", label: "All" },
  ...TASK_PRIORITY_KEYS.map((priority) => ({
    value: priority,
    label: TASK_PRIORITY_LABELS[priority],
  })),
];

const TaskFilters = () => {
  const { data } = useGetTagsQuery();

  const dispatch = useDispatch();

  const tagOptions = data?.map((tag) => ({
    key: tag.id,
    value: tag.name,
  }));

  function onFilterChange(option: string[], key: "tags"): void;
  function onFilterChange(
    option: OptionType | string,
    key: "priority" | "status"
  ): void;

  function onFilterChange(
    option: OptionType | string | string[],
    key: "priority" | "status" | "tags"
  ) {
    console.log("option", option);

    if (key === "tags") {
      const tagValues = Array.isArray(option)
        ? option
        : [typeof option === "string" ? option : option.value];

      dispatch(setFilters({ tags: tagValues }));
    } else {
      const value =
        typeof option === "string"
          ? option
          : (option as OptionType | undefined)?.value;
      dispatch(setFilters({ [key]: value }));
    }
  }

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
          onChange={(value) => onFilterChange(value, "status")}
          labelInValue
        />
      </Col>
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={priorityOptions}
          defaultValue="All"
          placeholder="Filter by status"
          onChange={(value) => onFilterChange(value, "priority")}
          labelInValue
        />
      </Col>
      <Col xs={24} md={6}>
        <Select
          className={styles.statusFilter}
          options={tagOptions}
          placeholder="Filter by tag"
          mode="tags"
          maxTagCount="responsive"
          onChange={(value) => onFilterChange(value, "tags")}
          allowClear
        />
      </Col>
    </Row>
  );
};

export default TaskFilters;
