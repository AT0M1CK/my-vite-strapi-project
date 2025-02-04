import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  return <div> Welcome {user?.username}</div>;
};

export default HomePage;
