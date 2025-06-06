import AllListsTable from "@/components/modules/listings/AllListsTable";
import DashboardPaginationButton from "@/components/shared/DashboardPaginationButton";
import { getAllItems } from "@/services/Listings";
import { getAllCategories } from "@/services/Categories";

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
  const { data: categories } = await getAllCategories();

  return (
    <div className="py-10">
      <AllListsTable allItemsOfOwner={data} categories={categories} />
      <div className="flex justify-center mt-5">
        <DashboardPaginationButton totalPage={meta?.totalPage} />
      </div>
    </div>
  );
};

export default AllProductsDashboardPage;
