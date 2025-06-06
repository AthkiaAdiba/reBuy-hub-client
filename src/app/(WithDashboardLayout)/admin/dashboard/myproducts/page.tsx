import AddListModal from "@/components/modules/listings/AddListModal";
import AllListsTable from "@/components/modules/listings/AllListsTable";
import DashboardPaginationButton from "@/components/shared/DashboardPaginationButton";
import { getAllCategories } from "@/services/Categories";
import { getAllItemsOfOwner } from "@/services/Listings";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AdminProductsDashboardPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const page = query?.page;
  const limit = 10;

  const { data: allItemsOfOwner, meta } = await getAllItemsOfOwner(page, limit);
  const { data: categories } = await getAllCategories();

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddListModal categories={categories} />
      </div>
      <AllListsTable
        allItemsOfOwner={allItemsOfOwner}
        categories={categories}
      />
      {allItemsOfOwner?.length > 0 && (
        <div className="flex justify-center mt-5">
          <DashboardPaginationButton totalPage={meta?.totalPage} />
        </div>
      )}
    </div>
  );
};

export default AdminProductsDashboardPage;
