import AddListModal from "@/components/modules/listings/AddListModal";
import AllListsTable from "@/components/modules/listings/AllListsTable";
import { getAllItemsOfOwner } from "@/services/Listings";

const dashboardProductsPage = async () => {
  const { data: allItemsOfOwner } = await getAllItemsOfOwner();

  console.log(allItemsOfOwner);

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddListModal />
      </div>
      <AllListsTable allItemsOfOwner={allItemsOfOwner} />
    </div>
  );
};

export default dashboardProductsPage;
