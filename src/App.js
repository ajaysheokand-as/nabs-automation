import { Dashboard } from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Gstin } from "./pages/Gstin";
import { IncomeTax } from "./pages/IncomeTax";
import { Tds } from "./pages/Tds";

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/gstin" element={<Gstin/>} />
        <Route path="/income-tax" element={<IncomeTax/>} />
        <Route path="/tds" element={<Tds/>} />

        <Route path="*" element={<h1 className="text-center mt-10 text-red-500">404 Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
