import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`orders`} />} />
        <Route path="/orders" element={<Dashboard activeTab={"orders"} />} />
      </Routes>
    </Router>
  );
}

export default App;
