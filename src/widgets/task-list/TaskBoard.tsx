import { useGetTasksQuery } from "@/entities/task/model/task.api";
import TaskCard from "@/entities/task/ui/TaskCard";
import {
  getFilters,
  setFilters,
} from "@/features/task-filters/model/taskFilterSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Spin, Alert, Empty, Pagination, Grid, Flex } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { useBreakpoint } = Grid;

const TaskBoard = () => {
  const filters = useSelector(getFilters);

  const { data, isLoading, isFetching, isError } = useGetTasksQuery(filters);

  const dispatch = useDispatch();

  const { currentPage, limitPerPage } = filters;

  const screens = useBreakpoint();

  useEffect(() => {
    const getPageSize = () => {
      if (screens.xxl) return 8;
      if (screens.xl) return 6;
      if (screens.lg) return 6;
      if (screens.md) return 2;
      return 1;
    };
    dispatch(setFilters({ limitPerPage: getPageSize() }));
  }, [dispatch, screens]);

  if (isLoading || isFetching) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    );
  }

  if (isError)
    return <Alert type="error" message="Error while fetching tasks" />;
  if (!data?.tasks?.length) return <Empty description="Tasks not found" />;

  const onPageChange = (value: number) => {
    dispatch(setFilters({ currentPage: value }));
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        {data?.tasks?.map((task) => (
          <Col key={task.id} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Pagination
          current={currentPage}
          total={data?.totalCount}
          pageSize={limitPerPage}
          onChange={onPageChange}
          showSizeChanger={false}
          showTotal={(total) => `All tasks: ${total}`}
        />
      </div>
    </div>
  );
};

export default TaskBoard;
