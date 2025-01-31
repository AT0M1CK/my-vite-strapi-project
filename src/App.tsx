import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 sm:p-20">
            <main className="w-full max-w-md p-4">
              <LoginPage />
            </main>
          </div>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
