import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import ReviewCard from "./ReviewCard";
import { useAuth } from "@/context/AuthContext";
import AddNewReview from "./AddNewReview";

interface Review {
  id: string;
  Username: string;
  Description: string;
  Rating: number;
  publishedAt: string;
  documentId: string;
  Active: boolean;
}

interface ReviewsData {
  reviews: Review[];
}

const GET_REVIEWS: TypedDocumentNode<ReviewsData> = gql`
  query GetReviews {
    reviews {
      Username
      Description
      Rating
      publishedAt
      documentId
      Active
    }
  }
`;

const ReviewList = () => {
  const { user } = useAuth();

  const { loading, error, data } = useQuery<ReviewsData>(GET_REVIEWS, {
    context: {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    },
    skip: !user?.token, // Skip query if no token exists
  });

  if (loading) return <div className="p-5">Loading reviews...</div>;
  if (error)
    return (
      <div className="p-5 text-red-500">
        Error loading reviews: {error.message}
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {data?.reviews?.map((review, index) => {
          const formattedDate = new Date(
            review.publishedAt
          ).toLocaleDateString();

          return (
            <ReviewCard
              key={index}
              title={review.Username}
              description={review.Description}
              rating={review.Rating}
              publishedAt={formattedDate}
              Active={review.Active}
            />
          );
        })}
        <div>
          <AddNewReview />
        </div>
      </div>
    </>
  );
};

export default ReviewList;
