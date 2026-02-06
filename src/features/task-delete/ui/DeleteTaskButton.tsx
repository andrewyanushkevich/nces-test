import { useDeleteTaskMutation } from "@/entities/task/model/task.api";
import type { Task } from "@/entities/task/model/task.type";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";

interface DeleteTaskButtonProps {
  task: Task;
}

const DeleteTaskButton: FC<DeleteTaskButtonProps> = (props) => {
  const { task } = props;
  const [deleteTask] = useDeleteTaskMutation();
  const navigate = useNavigate();

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete task?",
      icon: <ExclamationCircleOutlined color="red" style={{ fontSize: 12 }} />,
      content: "Are you sure you want to delete this task ?",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteTask(task.id).unwrap();
          message.success("Task is deleted");
          navigate("/");
        } catch {
          message.error("Error while deleting task");
        }
      },
    });
  };

  return (
    <>
      <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
};

export default DeleteTaskButton;
