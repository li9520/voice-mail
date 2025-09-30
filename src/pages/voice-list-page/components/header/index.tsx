import styles from "./header.module.scss";
import { Header } from "antd/es/layout/layout";

const HeaderRoot = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.logo}>Голосовая почта</div>
      <div className={styles.userInfo}>
        <div>Пользователь</div>
        <div className={styles.userEmail}>user@example.com</div>
      </div>
    </Header>
  );
};

export { HeaderRoot as Header };
