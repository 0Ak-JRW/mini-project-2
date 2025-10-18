import { useState } from "react";
// import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="">
      <Navbar />

      <main className="container mx-auto mt-8 px-36">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
