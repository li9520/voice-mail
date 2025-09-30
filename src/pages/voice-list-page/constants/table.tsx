import { Button, TableColumnsType, Tooltip } from "antd";
import { DateCell } from "../components/date-cell";
import { Player } from "../components/player";
import { DownloadOutlined } from "@ant-design/icons";

export const PAGE_SIZE = 10;

export const COLUMNS: TableColumnsType = [
  {
    title: "Дата",
    dataIndex: "received",
    key: "received",
    fixed: "left",
    width: 200,
    render: (timestamp) => <DateCell timestamp={timestamp} />,
  },
  {
    title: "Номер",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "Запись сообщения",
    dataIndex: "duration",
    key: "duration",
    render: (value) => <Player duration={value} />,
  },
  {
    title: "Действие",
    dataIndex: "action",
    key: "action",
    render: () => (
      <Tooltip title="скачать">
        <Button icon={<DownloadOutlined />} />
      </Tooltip>
    ),
  },
];
