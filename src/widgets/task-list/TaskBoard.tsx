import { useGetTasksQuery } from "@/entities/task/model/task.api";
import TaskCard from "@/entities/task/ui/TaskCard";
import { getFilters } from "@/features/task-filters/model/taskFilterSlice";
import { Row, Col, Skeleton, Alert, Empty } from "antd";
import { useSelector } from "react-redux";

const TaskBoard = () => {
  const filters = useSelector(getFilters);

  const { data, isLoading, isError } = useGetTasksQuery(filters);

  if (isLoading) {
    return (
      <Row gutter={[24, 24]}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Col key={i} span={8}>
            <Skeleton active />
          </Col>
        ))}
      </Row>
    );
  }

  if (isError)
    return <Alert type="error" message="Ошибка при загрузке задач" />;
  if (!data?.length) return <Empty description="Задачи не найдены" />;

  return (
    <Row gutter={[24, 24]}>
      {data.map((task) => (
        <Col key={task.id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
          <TaskCard task={task} />
        </Col>
      ))}
    </Row>
  );
};

export default TaskBoard;
