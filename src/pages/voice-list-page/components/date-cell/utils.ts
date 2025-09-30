import dayjs from "dayjs";

export function formatDateFromTimestamp(timestamp: number) {
  return dayjs(timestamp).format("DD.MM HH:mm");
}

export function getRelativeTime(timestamp: number) {
  const now = dayjs();
  const messageDate = dayjs(timestamp);

  if (messageDate.isSame(now, "day")) {
    return "Сегодня";
  }

  if (messageDate.isSame(now.subtract(1, "day"), "day")) {
    return "Вчера";
  }

  const diffDays = now.diff(messageDate, "day");

  if (diffDays > 0 && diffDays < 30) {
    return `${diffDays} ${getRussianDays(diffDays)} назад`;
  }

  return "";
}

function getRussianDays(days: number) {
  if (days === 1) return "день";
  if (days >= 2 && days <= 4) return "дня";
  return "дней";
}
