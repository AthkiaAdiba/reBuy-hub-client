import AllSubscribersTable from "@/components/modules/dashboard/Subscribers/AllSubscribersTable";
import DashboardPaginationButton from "@/components/shared/DashboardPaginationButton";
import { getAllSubscribedUsers } from "@/services/NewsletterService";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SubscribersDashboardPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const page = query?.page;
  const limit = 8;
  const { data, meta } = await getAllSubscribedUsers(page, limit);

  return (
    <div className="mt-10">
      <AllSubscribersTable subscribers={data} />
      {data?.length > 0 && (
        <div className="flex justify-center mt-5">
          <DashboardPaginationButton totalPage={meta?.totalPage} />
        </div>
      )}
    </div>
  );
};

export default SubscribersDashboardPage;
