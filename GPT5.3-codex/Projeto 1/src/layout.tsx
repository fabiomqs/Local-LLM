import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export default function Layout() {
  return (
    <div className="layout-root">
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}
