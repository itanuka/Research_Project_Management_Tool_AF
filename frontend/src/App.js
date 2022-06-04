import { Routes, BrowserRouter, Route } from "react-router-dom";


import Login from "./components/user/Login";

import AdminHome from "./components/admin/AdminHome";
import UpdateStaff from "./components/admin/UpdateStaff";
import UpdateStudent from "./components/admin/UpdateStudent";
import AddAdmin from "./components/admin/AddAdmin";

import RegisterStudent from "./components/user/student/RegisterStudent";
import ViewStudents from "./components/admin/ViewStudents";
import StudentHome from "./components/user/student/StudentHome";
import ViewStudentProfile from "./components/user/student/ViewStudentProfile";
import UpdateStudentProfile from "./components/user/student/UpdateStudentProfile";
import UpdateStudentPassword from "./components/user/student/UpdateStudentPassword";

import ViewStaff from "./components/admin/ViewStaff";
import RegisterStaff from "./components/user/staff/RegisterStaff";

import SupervisorHome from "./components/user/staff/SupervisorHome";
import ViewSupervisorProfile from "./components/user/staff/ViewSupervisorProfile";
import UpdateSupervisorProfile from "./components/user/staff/UpdateSupervisorProfile";
import UpdateSupervisorPassword from "./components/user/staff/UpdateSupervisorPassword";

import PanelMemberHome from "./components/user/staff/PanelMemberHome";
import ViewPanelMemberProfile from "./components/user/staff/ViewPanelMemberProfile";
import UpdatePanelMemberProfile from "./components/user/staff/UpdatePanelMemberProfile";
import UpdatePanelMemberPassword from "./components/user/staff/UpdatePanelMemberPassword";

import ViewGroups from './components/admin/ViewGroups'
import UpdateGroup from './components/admin/UpdateGroup'
import CreateGroup from './components/user/student/CreateGroup'
import GroupHome from './components/user/student/GroupHome'

import TemplateList from "./components/user/student/template/TemplateList";
import AddSubmission from "./components/user/student/submission/AddSubmission";
import SubmissionList from "./components/user/student/submission/SubmissionList";

// This ViewTopic component is only for testing. Remove It. It should be in the Topic Component in Student
import ViewTopic from "./components/user/student/topic/ViewTopic";

//tharusha
import React from 'react';
import Topic from './components/user/student/topic/Topic';
import TopicList from './components/user/staff/TopicList';
import AddTemplate from "./components/admin/AddTemplate";
import AllocatePanelMember from "./components/admin/AllocatePanelMember";
import AllocatePanelmemberList from "./components/user/student/AllocatePanelmemberList";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import AnimatedRoutes from "./components/user/staff/AnimatedRoutes";


export function App() {
  return (
    <div>
      <style>{"body { background-color: #f1f3f0; }"}</style>
      <style>{"body { padding: 0px 0px 0px 0px; }"}</style>
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
          <Route path="/students/view/:id" element={<ViewStudentProfile />}></Route>
          <Route path="/students/update/:id" element={<UpdateStudentProfile />}></Route>
          <Route path="/student/changePassword" element={<UpdateStudentPassword />}></Route>

          <Route path="/registerStaff" element={<RegisterStaff />}></Route>
          <Route path="/supervisor" element={<SupervisorHome />}></Route>
          <Route path="/staff/view/:id" element={<ViewSupervisorProfile />}></Route>
          <Route path="/staff/update/:id" element={<UpdateSupervisorProfile />}></Route>
          <Route path="/staff/changePassword" element={<UpdateSupervisorPassword />}></Route>

          <Route path="/panelMember" element={<PanelMemberHome />}></Route>
          <Route path="/staff/view/panelMember/:id" element={<ViewPanelMemberProfile />}></Route>
          <Route path="/staff/update/panelMember/:id" element={<UpdatePanelMemberProfile />}></Route>
          <Route path="/staff/panelMember/changePassword" element={<UpdatePanelMemberPassword />}></Route>

          <Route path="/admin/groups" element={<ViewGroups />}></Route>
          <Route path="admin/groups/update/:id" element={<UpdateGroup />}></Route>
          <Route path="/student/createGroup" element={<CreateGroup />}></Route>
          <Route path="/student/group" element={<GroupHome />}></Route>
          <Route path="/student/group/topic" element={<Topic />}></Route>

          <Route path="/student/group/templates" element={<TemplateList />}></Route>
          <Route path="/student/group/submissions/:templateId" element={<AddSubmission />}></Route>
          <Route path="/student/group/submissions/" element={<SubmissionList />}></Route>

          {/* tharusha */}
          <Route path="/list" element={<TopicList />}></Route>
          <Route path="/addtemplate" element={<AddTemplate />}></Route>

          <Route path="ViewTopic" element={<ViewTopic />}></Route>
          <Route path="/allocatepanelmembers" element={<AllocatePanelMember/>}></Route>
          <Route path="/allocatepanelmemberslist" element={<AllocatePanelmemberList/>}></Route>
        </Routes>

        <AnimatedRoutes />
      </BrowserRouter>

      <Footer />
    </div>
  );
}
