import { taskSchema } from "@/entities/task/model/schema";
import {
  TASK_PRIORITY_KEYS,
  TASK_PRIORITY_LABELS,
  TASK_STATUSE_KEYS,
  TASK_STATUSE_LABELS,
  type Task,
} from "@/entities/task/model/task.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import styles from "./TaskForm.module.css";

interface TaskFormProps {
  task?: Task;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

type FormValues = Omit<Task, "id" | "createdAt" | "updatedAt">;

const statusOptions = TASK_STATUSE_KEYS.map((key) => ({
  value: key,
  label: TASK_STATUSE_LABELS[key],
}));

const priorityOptions = TASK_PRIORITY_KEYS.map((priority) => ({
  value: priority,
  label: TASK_PRIORITY_LABELS[priority],
}));

const TaskForm: FC<TaskFormProps> = (props) => {
  const { task, onSubmit, onCancel } = props;
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      status: task?.status,
      priority: task?.priority,
      deadline: task?.deadline,
      tags: task?.tags,
    },
    resolver: zodResolver(taskSchema),
    mode: "onBlur",
  });

  const { errors } = formState;

  const onFinish = (values: FormValues) => {
    console.log("values", values);
    onSubmit(values);
    reset();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Form.Item
        label="Title"
        required
        validateStatus={errors.title ? "error" : ""}
        help={errors.title?.message}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input {...field} size="large" placeholder="Enter title" />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Description"
        validateStatus={errors.description ? "error" : ""}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextArea {...field} size="large" />}
        />
      </Form.Item>
      <div className={styles.statusContainer}>
        <div>
          <Form.Item
            label="Status"
            required
            validateStatus={errors.status ? "error" : ""}
            help={errors.status?.message}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  options={statusOptions}
                  labelInValue
                />
              )}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="Deadline"
            required
            validateStatus={errors.deadline ? "error" : ""}
            help={errors.deadline?.message}
          >
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  style={{ width: "100%" }}
                  format="DD.MM.YYYY"
                />
              )}
            />
          </Form.Item>
        </div>
      </div>
      <Form.Item
        label="Priority"
        required
        validateStatus={errors.priority ? "error" : ""}
        help={errors.priority?.message}
      >
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field} buttonStyle="solid" className="w-full flex">
              {priorityOptions.map((elem) => (
                <Radio.Button value={elem.value}>{elem.label}</Radio.Button>
              ))}
            </Radio.Group>
          )}
        />
      </Form.Item>
      <Form.Item label="Tags">
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              mode="tags"
              size="large"
              placeholder="Select tags"
              options={field?.value?.map((tag) => ({
                key: tag,
                value: tag,
              }))}
            />
          )}
        />
      </Form.Item>
      <div className={styles.submitButton}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          {task ? "Edit" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;
