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
import { getFilters, setFilters } from "../model/taskFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceCallback } from "@/shared/hooks/useDebounceCallback";

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

const dateSortOptions: OptionType[] = [
  { value: "desc", label: "Newest first" },
  { value: "asc", label: "Oldest first" },
];

const TaskFilters = () => {
  const { data } = useGetTagsQuery();
  const filters = useSelector(getFilters);

  const dispatch = useDispatch();

  const tagOptions = data?.map((tag) => ({
    key: tag.id,
    value: tag.name,
    label: tag.name,
  }));

  function onFilterChange(option: string[], key: "tags"): void;
  function onFilterChange(
    option: OptionType | string,
    key: "priority" | "status" | "sortByDate"
  ): void;

  function onFilterChange(
    option: OptionType | string | string[],
    key: "priority" | "status" | "tags" | "sortByDate"
  ) {
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

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ search: event.target.value }));
  };

  const deboubncedSearchChange = useDebounceCallback(onSearchChange, 300);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={6}>
        <Search placeholder="Search task" onChange={deboubncedSearchChange} />
      </Col>
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={statusOptions}
          defaultValue="All"
          placeholder="Filter by status"
          onChange={(value) => onFilterChange(value, "status")}
          labelInValue
          value={filters.status}
        />
      </Col>
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={priorityOptions}
          defaultValue="All"
          placeholder="Filter by priority"
          onChange={(value) => onFilterChange(value, "priority")}
          labelInValue
          value={filters.priority}
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
      <Col xs={24} md={4}>
        <Select
          className={styles.statusFilter}
          options={dateSortOptions}
          defaultValue="desc"
          placeholder="Sort by date"
          onChange={(value) => onFilterChange(value, "sortByDate")}
        />
      </Col>
    </Row>
  );
};

export default TaskFilters;
