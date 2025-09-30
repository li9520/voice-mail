import { PauseOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useState } from "react";
import styles from "./player.module.scss";
import { useNow } from "@src/hooks/use-now";

interface Props {
  duration: number;
}

const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// имитация работы преера
export const Player = ({ duration }: Props) => {
  const durationMs = duration * 1000;
  const [startAt, setStartAt] = useState<number>();
  const [currentTimer, setCurrentTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const now = useNow(!!startAt && !isPaused, 1000, () => {
    if (isTimeOver) {
      setCurrentTimer(0);
      setStartAt(undefined);
    }
  });

  const { isRunning, time, isTimeOver } = (() => {
    if (startAt) {
      const time = useNow.calculateCountUp(
        now,
        startAt,
        currentTimer,
        durationMs
      );
      const isTimeOver = time === durationMs;

      return {
        isRunning: !isTimeOver,
        isTimeOver,
        time,
      };
    }

    return {
      isRunning: false,
      isTimeOver: currentTimer === durationMs,
      time: currentTimer,
    };
  })();

  const handlePlay = () => {
    setStartAt(Date.now());
    setIsPaused(false);
  };

  const handlePause = () => {
    setStartAt(undefined);
    setIsPaused(true);
    setCurrentTimer(time);
  };

  const progressPercent = (time / durationMs) * 100;

  return (
    <div className={styles.player}>
      <Button
        type="primary"
        shape="circle"
        icon={
          isPaused || !isRunning ? <CaretRightOutlined /> : <PauseOutlined />
        }
        onClick={() => (isRunning && !isPaused ? handlePause() : handlePlay())}
        className={styles.playerButton}
      />
      <div className={styles.progress}>
        <div className={styles.timeDisplay}>
          <span>{formatTime(time)}</span>
          <span>{formatTime(durationMs)}</span>
        </div>
        <div className={styles.progressContainer}>
          <Progress
            percent={progressPercent}
            showInfo={false}
            strokeColor={{
              "0%": "#1890ff",
              "100%": "#1890ff",
            }}
            trailColor="#f0f0f0"
            size="small"
            className={styles.voiceProgress}
          />
        </div>
      </div>
    </div>
  );
};
