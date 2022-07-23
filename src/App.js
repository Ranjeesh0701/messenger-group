import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import Loading from "./pages/Loading";

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        {loading && <Route path="/" element={<Loading />} />}

        {user && <Route path="/login" element={<Navigate replace to="/" />} />}
        {!user && <Route path="/login" element={<Login />} />}

        {user && <Route path="/" element={<Home />} />}
        {!user && <Route path="/" element={<Navigate replace to="/login" />} />}
      </Routes>
    </Router>
  );
}

export default App;
