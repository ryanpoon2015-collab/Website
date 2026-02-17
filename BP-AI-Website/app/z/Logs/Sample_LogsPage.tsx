import PageContainer from "@/components/templates/PageContainer";
import { useFHPagination } from "@/hooks/useFHPagination";
import LogsTable from "./LogsTable";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import FH from "@/classes/FH";
import LogDevice from "@/classes/LogDevice";

interface Sample_LogsPageProps {}

const Sample_LogsPage: React.FC<Sample_LogsPageProps> = ({}) => {
  const myUserPagination = useFHPagination<LogDevice>(
    FH.LogDevice,
    "id",
    "asc",
    12
  );

  return (
    <PageContainer>
      <LogsTable
        data={myUserPagination.data.map((u) => [u.id])}
        headers={["id"]}
        legends={[["id", "Identification"]]}
        pagination={myUserPagination}
        classNameHeader="t46c"
        classNameBody="t22c"
      />
      <WebsiteVersion />
    </PageContainer>
  );
};

export default Sample_LogsPage;
