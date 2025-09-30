import { Layout, Pagination, Table } from "antd";
import { voiceApi } from "./api";
import { useList } from "./use-list";
import { usePagination } from "./use-pagination";
import type { VoiceListItem } from "./types";
import { useMemo } from "react";
import { Header } from "./components/header";
import { Content } from "./components/content";
import { Footer } from "./components/footer";
import { TableInfo } from "./components/table-info";
import { COLUMNS, PAGE_SIZE } from "./constants/table";

const mapVoiceToRow = (voice: VoiceListItem) => ({
  received: voice.received,
  from: voice.from,
  duration: voice.duration,
  key: voice.received,
});

export const Page = () => {
  const { page, changePage } = usePagination();
  const { data } = useList(voiceApi, page, PAGE_SIZE);

  const rowList = useMemo(() => {
    return data.items.map(mapVoiceToRow);
  }, [data.items]);

  return (
    <Layout>
      <Header />
      <Content
        renderTable={(scrollY) => (
          <Table
            scroll={{ y: scrollY, x: 1040 }}
            dataSource={rowList}
            columns={COLUMNS}
            pagination={false}
          />
        )}
        tableInfo={<TableInfo totalItems={data.totalItems} />}
        pagination={
          <Pagination
            align="center"
            defaultCurrent={1}
            total={data.totalItems}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
            onChange={changePage}
          />
        }
      />
      <Footer />
    </Layout>
  );
};
