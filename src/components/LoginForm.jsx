import React, { useEffect, useState } from "react";
import loginImg from "../assets/login-img.png";
import RegisterForm from "./RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginToggle, setLoginToggle] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }

    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [isAuthenticated, navigate, dispatch, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen font-sans">
      <div className="flex flex-col justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
            {loginToggle ? "Welcome back" : "Create your account"}
          </h2>

          {loginToggle ? (
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                  placeholder="abc@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200 cursor-pointer"
              >
                {loading ? "please wait.." : "Log In"}
              </button>
            </form>
          ) : (
            <RegisterForm />
          )}

          <div className="flex items-center gap-2 mt-6">
            <p>
              {loginToggle
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              className="text-blue-800 underline bg-transparent cursor-pointer"
              onClick={() => setLoginToggle(!loginToggle)}
            >
              {loginToggle ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-900 text-white flex flex-col justify-center items-center px-10 py-16 space-y-8">
        <h1 className="text-5xl font-bold">TaskFlow</h1>
        <p className="text-center text-lg max-w-md">
          Stay organized and productive. Log in to access your personalized task
          dashboard, manage your to-dos, and track your progress.
        </p>
        <img src={loginImg} alt="Login Visual" className="w-2/3 max-w-xs" />
      </div>
    </div>
  );
};

export default LoginForm;
