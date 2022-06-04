import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import SupervisorSideBar from "../../layout/SupervisorSideBar";

function SupervisorHome() {
  let navigate = useNavigate()

  const [user, setUser] = useState({});

  //checking whether the user is logged in
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt)
        navigate('/unauthorized')
    } catch (error) {
    }
  }, [])

  useEffect(() => {

    try {
      const jwt = localStorage.getItem("token");
      setUser(jwtDecode(jwt));
    } catch (error) {

    }
  }, []);




  return (
    <div>
      <div className="row">
        <div className="col-2">
          <SupervisorSideBar />
        </div>
        <div className="col-10">
          {/* Content */}
          <div className="container">
            <div class="row row-cols-1 row-cols-md-2 mt-5">

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">View Topics</div>
                  <div class="card-body">
                    <a href="" className="custom-size"><i class="fa-solid fa-file"></i></a>
                  </div>
                </div>
              </div>

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Topic Submition</div>
                  <div class="card-body">
                    <a href="" className="custom-size"><i class="fa-solid fa-file-circle-plus"></i></a>
                  </div>
                </div>
              </div>

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Change Password</div>
                  <div class="card-body">
                    <a href="" className="custom-size"><i class="fa-solid fa-user-gear"></i></a>
                  </div>
                </div>
              </div>

              <div class="col mb-4">
                <div class="card text-white bg-dark mb-3" style={{ height: '240px', width: '400px' }}>
                  <div class="card-header text-center">Dummy</div>
                  <div class="card-body">
                    <a href="" className="custom-size"><i class="fas fa-clipboard-list"></i></a>
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

export default SupervisorHome;
