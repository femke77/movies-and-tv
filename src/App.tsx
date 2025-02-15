import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScrollRestoration } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <ScrollRestoration />
      <div className="bg-black text-white h-full">
        <Nav setSearchQuery={setSearchQuery} />
        <main className="min-h-screen">
          <Outlet context={searchQuery} />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
