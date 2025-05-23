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
import Employee from "./pages/Employee";
import CreateTask from "./pages/CreateTask";
import ManageTask from "./pages/ManageTask";
import Dashboard from "./pages/Dashboard";
import { Skeleton } from "antd";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading)
    return (
      <div className="p-8">
        <Skeleton active />
      </div>
    );
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
            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
            <Route
              path="/admin/create-task"
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-task"
              element={
                <ProtectedRoute>
                  <ManageTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-task/:id"
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              }
            />

            {/* Employees */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employee/manage-task"
              element={
                <ProtectedRoute>
                  <ManageTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/manage-task/:id"
              element={
                <ProtectedRoute>
                  <CreateTask />
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
