import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import useAuthCheck from "./hooks/useAuthCheck";
import Home from "./pages/Home/Home";
import Root from "./routes/root";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  const isLoggedIn = useAuthCheck();
  return (
    <Router>
      <Root />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<PublicRoute element={<Login />} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/register"
          element={<PublicRoute element={<Register />} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/forgotpassword"
          element={<PublicRoute element={<ForgotPassword />} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/reset-password"
          element={<PublicRoute element={<ResetPassword />} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
