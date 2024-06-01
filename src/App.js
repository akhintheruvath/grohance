import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`orders`} />} />
        <Route path="/orders" element={<Dashboard activeTab={"orders"} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
