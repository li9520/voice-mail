import { Typography } from "antd";
import styles from "./table-info.module.scss";

interface Props {
  totalItems: number;
}

const { Text } = Typography;

export const TableInfo = ({ totalItems }: Props) => {
  return (
    <Text className={styles.tableInfo}>Всего сообщений: {totalItems}</Text>
  );
};
