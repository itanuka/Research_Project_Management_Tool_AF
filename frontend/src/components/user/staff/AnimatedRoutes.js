import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"
import SupervisorList from "./SupervisorList";
import CoSupervisorList from "./CoSupervisorList";
import RequestListSupervisor from "./RequestListSupervisor";
import RequestListCoSupervisor from "./RequestListCoSupervisor";
import GroupPage from "./GroupPage";

import { AnimatePresence } from "framer-motion"

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/supervisors" element={<SupervisorList />}/>
        <Route path="/co_supervisors" element={<CoSupervisorList />} />
        <Route path="/supervisor_requests" element={<RequestListSupervisor />}/>
        <Route path="/co_supervisor_requests" element={<RequestListCoSupervisor />}/>
        <Route path="/group_home" element={<GroupPage />}/>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
