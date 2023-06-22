import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoutes from "./componants/ProtectedRoutes";
import Profile from "./pages/Profile";
import { getCurrentUser } from "./redux/Actions/userActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SignUp from "./pages/SignUp";
import CreateProfile from "./pages/CreateProfile";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SnackBarAlert from "./componants/SnackBarAlert";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />
        <Route
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
          path="/profile/:userid"
        />
        <Route element={<CreateProfile />} path="/createprofile" />
        <Route element={<Search />} path="/search" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<About />} path="/about" />
      </Routes>
      <SnackBarAlert />
    </div>
  );
}

export default App;
