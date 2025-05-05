import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./pages/Auth";
import { fetchCurrentUser } from "./redux/features/userSlice";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import Employee from "./pages/Employee";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;
  return children;
};

const AppLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.user);

  const isAuthPage = location.pathname === "/";

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 pb-20 md:pb-0">
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/team-members"
              element={
                <ProtectedRoute>
                  <Employee />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
