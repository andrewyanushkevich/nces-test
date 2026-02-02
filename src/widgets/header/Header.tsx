import { Layout, Typography } from "antd";

import styles from "./Header.module.css";

const { Header: AntDHeader } = Layout;

const { Title } = Typography;

const Header = () => {
  return (
    <AntDHeader className={styles.root}>
      <Title level={4} style={{ margin: 0, color: "#2563eb" }}>
        TaskFlow
      </Title>
    </AntDHeader>
  );
};

export default Header;
