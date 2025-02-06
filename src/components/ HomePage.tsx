import { useAuth } from "../context/AuthContext";
import ReviewList from "./ReviewList";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div className="w-full p-4">
      <span className="text-2xl text-gray-700 p-6">My Reviews</span>
      {/* Add your main content here */}
      <ReviewList />
    </div>
  );
};

export default HomePage;
