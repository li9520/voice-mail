import styles from "./footer.module.scss";
import { Footer } from "antd/es/layout/layout";

const FooterRoot = () => {
  return (
    <Footer className={styles.footer}>
      ©{new Date().getFullYear()} VoiceMail System
    </Footer>
  );
};

export { FooterRoot as Footer };
