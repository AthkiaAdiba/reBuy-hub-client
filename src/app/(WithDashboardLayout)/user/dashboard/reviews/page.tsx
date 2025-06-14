import ReviewsTable from "@/components/modules/dashboard/Reviews/ReviewsTable";
import { getAllMyProductsReviews } from "@/services/ReviewService";

const UserReviewsPage = async () => {
  const { data } = await getAllMyProductsReviews();

  return (
    <div>
      <ReviewsTable reviews={data} />
    </div>
  );
};

export default UserReviewsPage;
