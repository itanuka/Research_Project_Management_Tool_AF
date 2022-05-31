import { Routes, BrowserRouter, Route } from "react-router-dom";


import Login from "./components/user/Login";

import AdminHome from "./components/admin/AdminHome";
import UpdateStaff from "./components/admin/UpdateStaff";
import UpdateStudent from "./components/admin/UpdateStudent";
import AddAdmin from "./components/admin/AddAdmin";

import RegisterStudent from "./components/user/student/RegisterStudent";
import ViewStudents from "./components/admin/ViewStudents";
import StudentHome from "./components/user/student/StudentHome";

import ViewStaff from "./components/admin/ViewStaff";
import RegisterStaff from "./components/user/staff/RegisterStaff";
import SupervisorHome from "./components/user/staff/SupervisorHome";
import PanelMemberHome from "./components/user/staff/PanelMemberHome";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export function App() {
  return (
    <div>
      <style>{"body { background-color: #f1f3f0; }"}</style>
      <BrowserRouter>
        <Header />


        <Routes>
          <Route path="/" element={<Login />}></Route>

          <Route path="/admin-home" element={<AdminHome />}></Route>
          <Route path="admin/staff/update/:id" element={<UpdateStaff />}></Route>
          <Route path="admin/students/update/:id" element={<UpdateStudent />}></Route>
          <Route path="/admin/students" element={<ViewStudents />}></Route>
          <Route path="/admin/staff" element={<ViewStaff />}></Route>
          <Route path="/addAdmin" element={<AddAdmin />}></Route>

          <Route path="/registerStudent" element={<RegisterStudent />}></Route>
          <Route path="/student" element={<StudentHome />}></Route>

          <Route path="/registerStaff" element={<RegisterStaff />}></Route>
          <Route path="/supervisor" element={<SupervisorHome />}></Route>
          <Route path="/panelMember" element={<PanelMemberHome />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Footer /> */}
    </div>
  );
}
