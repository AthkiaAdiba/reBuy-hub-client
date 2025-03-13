import AddListModal from "@/components/modules/listings/AddListModal";
import AllListsTable from "@/components/modules/listings/AllListsTable";
import { getAllItemsOfOwner } from "@/services/Listings";

const DashboardProductsPage = async () => {
  const { data: allItems } = await getAllItemsOfOwner();

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
