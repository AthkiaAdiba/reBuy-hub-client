import AddCategoryModal from "@/components/modules/dashboard/Categories/AddCategoryModal";
import CategoriesTable from "@/components/modules/dashboard/Categories/CategoriesTable";
import DashboardPaginationButton from "@/components/shared/DashboardPaginationButton";
import { getAllCategories } from "@/services/Categories";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UserCategoriesPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const page = query?.page;
  const limit = 5;
  const { data, meta } = await getAllCategories(page, limit);

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddCategoryModal />
      </div>
      <CategoriesTable categories={data} />
      <div className="flex justify-center mt-5">
        <DashboardPaginationButton totalPage={meta?.totalPage} />
      </div>
    </div>
  );
};

export default UserCategoriesPage;
