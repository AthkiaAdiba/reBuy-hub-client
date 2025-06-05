import AllListsTable from "@/components/modules/listings/AllListsTable";
import DashboardPaginationButton from "@/components/shared/DashboardPaginationButton";
import { getAllItems } from "@/services/Listings";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsDashboardPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const page = query?.page;
  const limit = 9;
  const { data, meta } = await getAllItems(undefined, page, limit);

  return (
    <div className="py-10">
      <AllListsTable allItemsOfOwner={data} />
      <div className="flex justify-center mt-5">
        <DashboardPaginationButton totalPage={meta?.totalPage} />
      </div>
    </div>
  );
};

export default AllProductsDashboardPage;
