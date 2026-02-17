import { FHPagination } from "@/hooks/useFHPagination";
import ChevronLeft from "../../../components/svg/icon/ChevronLeft";
import ChevronRight from "../../../components/svg/icon/ChevronRight";
import { twMerge } from "tailwind-merge";

interface LogsTableProps<T extends { id: string }> {
  headers: string[];
  title?: string;
  data: any[][];
  legends?: [string, string][];
  pagination?: FHPagination<T>;
  classNameTable?: string;
  classNameHeader: string;
  classNameBody?: string;
  classNameBodyWrapper?: string;
  lightMode?: boolean;
}

const LogsTable: React.FC<LogsTableProps<any>> = ({
  headers,
  title,
  data,
  legends,
  pagination,
  classNameTable,
  classNameHeader,
  classNameBody,
  classNameBodyWrapper,
  lightMode = false,
}) => {
  const columns = headers.map((header, i) => [
    header,
    ...data.map((row) => row[i]),
  ]);

  return (
    <div className={twMerge("csc-4 wf", lightMode ? "t-black" : "t-white")}>
      {title && <p className="t76">{title}</p>}

      {/*//! TABLE */}
      <div
        className={twMerge(
          "wf csc-4 rounded-2xl pb-4 px-6",
          lightMode ? "bg-white b b-log_gray" : "bg-log_gray",
          classNameTable
        )}
        style={{
          maxWidth: "100%",
        }}
      >
        <div
          className="ras-4 wf"
          style={{
            maxWidth: "90vw",
            overflowX: "auto",
          }}
        >
          {columns.map((data, i) => {
            const header = data[0];
            const restOfData = data.slice(1);

            return (
              <div key={i} className="csc-4 relative">
                <p
                  className={twMerge(
                    "sticky top-0 wf pt-2",
                    lightMode ? "bg-white" : "bg-log_gray",
                    classNameHeader
                  )}
                >
                  {header}
                </p>
                <div className={twMerge("csc-4", classNameBodyWrapper)}>
                  {restOfData.map((d, i) => (
                    <div
                      key={i}
                      className={twMerge(
                        "truncate whitespace-nowrap",
                        classNameBody
                      )}
                      style={{
                        minHeight: "18px",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* //! < 1 > */}
        {pagination && (
          <div className="flex gap-4 items-center mt-2 m-auto pb-2">
            <ChevronLeft
              color={lightMode ? "#000" : "#fff"}
              onClick={pagination.prev}
              disabled={!pagination.hasPrev || pagination.loading}
            />
            <p className="text-text_dark">{pagination.pageNum}</p>
            <ChevronRight
              color={lightMode ? "#000" : "#fff"}
              onClick={pagination.next}
              disabled={!pagination.hasNext || pagination.loading}
            />
          </div>
        )}
      </div>

      {/*//! LEGEND */}
      {legends && (
        <div className="css-4 mt-4">
          <p className="t46">Legend</p>

          <div className="grid grid-cols-2 gap-3 px-2">
            {legends?.map(([abbr, full], i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                <p className="t26">{abbr}:</p>
                <p className="t22">{full}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsTable;
