import AddListModal from "@/components/modules/listings/AddListModal";
import AllListsTable from "@/components/modules/listings/AllListsTable";
import { getAllItems } from "@/services/Listings";

const DashboardProductsPage = async () => {
  const { data: allItems } = await getAllItems();

  return (
    <div className="px-10">
      <div className="flex justify-end">
        <AddListModal />
      </div>
      <AllListsTable allItems={allItems} />
    </div>
  );
};

export default DashboardProductsPage;
