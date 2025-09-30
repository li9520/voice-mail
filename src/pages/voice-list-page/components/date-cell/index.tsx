import styles from "./date-cell.module.scss";
import { formatDateFromTimestamp, getRelativeTime } from "./utils";
interface Props {
  timestamp: number;
}

export const DateCell = ({ timestamp }: Props) => {
  return (
    <div className={styles.dateColumn}>
      <div className={styles.dateMain}>
        {formatDateFromTimestamp(timestamp)}
      </div>
      <div className={styles.dateRelative}>{getRelativeTime(timestamp)}</div>
    </div>
  );
};
