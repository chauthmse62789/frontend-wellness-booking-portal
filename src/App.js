import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { useSelector } from 'react-redux'
import { loginState$ } from "./redux/selectors";
import { useEffect } from "react";
import Page404 from "./pages/Page404.js";



function useAuth() {
  let isAuth = false;
  const jwt = localStorage.getItem('access_token');

  if (jwt) {
    isAuth = true
  }
  return isAuth;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  const navigate = useNavigate()
  const { isLogin } = useSelector(loginState$)
  const { data } = useSelector(loginState$)


  useEffect(() => {
    if (isLogin) {
      navigate('/dashboard', { replace: true });
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('username', data.username)
      localStorage.setItem('role', data.role)
    }
  },[isLogin,navigate,data.accessToken,data.username,data.role])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute>
                                            <Dashboard data={data} />
                                        </PrivateRoute>} />                      
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}
export default App;
