import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/ HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 sm:p-20">
            <main className="w-full max-w-md p-4">
              {/* Define Routes */}
              <Routes>
                {/* Public Route */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected Route */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/homepage" element={<HomePage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
