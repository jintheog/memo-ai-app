import { Outlet } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";

export default function RootLayout() {
  return (
    <div>
      <header className="bg-gray-50 shadow-sm border-b border-gray-300">
        <NavigationBar />
      </header>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
