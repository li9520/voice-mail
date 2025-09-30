import { ReactElement, useRef, useState } from "react";
import styles from "./content.module.scss";
import { Content } from "antd/es/layout/layout";
import { useResizeObserver } from "../../../../hooks/use-resize-observer";

interface ContentRootProps {
  renderTable: (scrollY: number) => ReactElement;
  tableInfo: ReactElement;
  pagination: ReactElement;
}
const ContentRoot = ({
  renderTable,
  pagination,
  tableInfo,
}: ContentRootProps) => {
  const tableWrapperRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useResizeObserver(tableWrapperRef, {
    onResize: (entry) => {
      const height = entry.contentRect.height;
      setScrollY(height - 55);
    },
  });
  return (
    <Content className={styles.content}>
      <div className={styles.paper}>
        <div className={styles.tableWrapper} ref={tableWrapperRef}>
          {renderTable(scrollY)}
        </div>
        {tableInfo}
        {pagination}
      </div>
    </Content>
  );
};

export { ContentRoot as Content };
