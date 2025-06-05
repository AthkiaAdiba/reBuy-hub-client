import UsersTable from "@/components/modules/dashboard/users/UsersTable";
import DashboardPaginationButton from "@/components/shared/DashboardPaginationButton";
import { getAllUsers } from "@/services/User";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UserPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const query = await searchParams;
  const page = query?.page;
  const limit = 5;
  const { data: users, meta } = await getAllUsers(page, limit);

  return (
    <div className="pt-8">
      <UsersTable users={users} />
      <div className="flex justify-center mt-5">
        <DashboardPaginationButton totalPage={meta?.totalPage} />
      </div>
    </div>
  );
};

export default UserPage;
