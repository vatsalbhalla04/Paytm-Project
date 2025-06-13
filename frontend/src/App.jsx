import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SignIn } from "./Pages/SignIn";
import { Dashboard } from "./Pages/Dashboard";
import { SignUp } from "./Pages/SignUp";
import { SendMoney } from "./Pages/SendMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendMoney" element={<SendMoney />} />
        </Routes>
        <ToastContainer position="top-center" theme="colored" />
      </BrowserRouter>
    </>
  );
}

export default App;
