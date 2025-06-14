import AdminOverview from "@/components/modules/dashboard/AdminOverview/AdminOverview";
import { getAllPaidTransactions } from "@/services/Cart";
import { getAdminOverviews } from "@/services/Overview";

const AdminDashboard = async () => {
  const { data: adminOverview } = await getAdminOverviews();
  const { data: transactions } = await getAllPaidTransactions();

  return (
    <div>
      <AdminOverview
        transactions={transactions}
        adminOverview={adminOverview}
      />
    </div>
  );
};

export default AdminDashboard;
