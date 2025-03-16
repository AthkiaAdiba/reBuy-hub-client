import AddListModal from "@/components/modules/listings/AddListModal";
import AllListsTable from "@/components/modules/listings/AllListsTable";
import { getAllItemsOfOwner } from "@/services/Listings";

const dashboardProductsPage = async () => {
  const { data: allItemsOfOwner } = await getAllItemsOfOwner();

  return (
    <div className="px-10">
      <div className="flex justify-end">
        <AddListModal />
      </div>
      <AllListsTable allItemsOfOwner={allItemsOfOwner} />
    </div>
  );
};

export default dashboardProductsPage;
