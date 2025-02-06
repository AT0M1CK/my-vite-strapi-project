import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/ HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

// In your LayoutWrapper component, modify the main content container:
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      <Header />
      <div
        className={`flex min-h-screen ${
          isLoginPage ? "justify-center items-center bg-gray-200" : ""
        }`}
      >
        <div
          className={`${
            isLoginPage ? "w-full max-w-md p-6" : "flex-1 bg-gray-100 pt-16" // Add pt-16 (64px) for header height
          }`}
        >
          <main className="h-full p-4">{children}</main>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/homepage" element={<HomePage />} />
            </Route>
          </Routes>
        </LayoutWrapper>
      </Router>
    </ApolloProvider>
  );
}

export default App;
