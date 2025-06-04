import { getAllItems } from "@/services/Listings";

const AllProductsDashboardPage = async () => {
  const { data } = await getAllItems();
  console.log(data);

  return <div>{/* <AllListsTable allItemsOfOwner={allItems} /> */}</div>;
};

export default AllProductsDashboardPage;
