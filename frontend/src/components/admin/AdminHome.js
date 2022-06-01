import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode'
import AdminSideBar from "../layout/AdminSideBar";
import '../style/adminHome.css'


function AdminHome() {

  const [user, setUser] = useState({});

  useEffect(() => {

    try {
      const jwt = localStorage.getItem("token");
      setUser(jwtDecode(jwt));
    } catch (error) {

    }
  }, []);

  const navigate = useNavigate();

  return (
    <div >
      
      <div className="row">

        <div className="col-2" >
          <AdminSideBar />
        </div>

        <div className="col-10">
          <div className="container">
            <div class="row row-cols-1 row-cols-md-2 mt-5">

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Manage Student</div>
                  <div class="card-body">
                    <a href="/admin/students" className="custom-size"> <i class="fa-solid fa-user-graduate"></i></a>
                  </div>
                </div>
              </div>

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Manage Staff Member</div>
                  <div class="card-body">
                    <a href="/admin/staff" className="custom-size"><i class=" fas fa-users"></i></a>
                  </div>
                </div>
              </div>

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Add New Admin</div>
                  <div class="card-body">
                    <a href="/addAdmin" className="custom-size"><i class="fa-solid fa-user-gear"></i></a>
                  </div>
                </div>
              </div>

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Manage Student Groups</div>
                  <div class="card-body">
                    <a href="/admin/groups" className="custom-size"><i class="fa-solid fa-users-rectangle"></i></a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
