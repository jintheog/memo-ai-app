import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import PATHS from "../constants/paths";
export default function RootLayout() {
  const token = useSelector((state) => state.auth.token);

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
