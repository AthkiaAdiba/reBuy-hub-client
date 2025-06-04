import UsersTable from "@/components/modules/dashboard/users/UsersTable";
import { getAllUsers } from "@/services/User";

const UserPage = async () => {
  const userData = await getAllUsers();
  const users = userData?.data;

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
};

export default UserPage;
