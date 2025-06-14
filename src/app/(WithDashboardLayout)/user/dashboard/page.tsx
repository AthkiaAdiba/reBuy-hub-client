import UserOverview from "@/components/modules/dashboard/UserOverview/UserOverview";
import { getUserOverviews } from "@/services/Overview";

const UserDashboard = async () => {
  const { data } = await getUserOverviews();

  return (
    <div>
      <UserOverview userOverview={data} />
    </div>
  );
};

export default UserDashboard;
