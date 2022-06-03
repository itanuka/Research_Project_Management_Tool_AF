

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";


import '../style/login.css'
function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const loginData = {
      userID,
      password,
    };

    const response = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      loginData
    );

    console.log(response);
    const data = response.data;

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("userID", data.userID);


      if (data.role === "student") {
        Swal.fire({
          title: 'Login Successfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        }).then((value) =>{
          Swal.fire(( window.location = "/student"));
        });
       
      } else if (data.role === "supervisor") {
        Swal.fire({
          title: 'Login Successfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        }).then((value) =>{
          Swal.fire(( window.location = "/supervisor"));
        });
        // navigate("/supervisor");
        
      } else if (data.role === "admin") {
        Swal.fire({
          title: 'Login Successfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        }).then((value) =>{
          Swal.fire(( window.location = "/admin-home"));
        });
        
        
      } else if (data.role === "panel_member") {
        Swal.fire({
          title: 'Login Successfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        }).then((value) =>{
          Swal.fire((  window.location = "/panelMember"));
        });
       
      } else {
        console.log("user type err");
      }
    } else if (data.status === "no_user") {
      Swal.fire({
        title: "User does not exists!!",
        text: "Please create an account",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setUserID("");
          setPassword("");
        }
      });
    } else {
      Swal.fire({
        title: "Incorrect Password!!",
        text: "Please enter your password again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setPassword("");
    }
  };

  return (
    <div>
      <div className="row" style={{height:"100px"}}></div>

      <div class="container body min-vh-100">
        <div class="row mt-5 mb-5">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="card ">
              <div class="card-body">
                <h2 class="mb-4 text-center">Sign In</h2>

                <form onSubmit={loginUser}>

                  <div class="form-group ">
                    <label for="userID">User ID</label>
                    <input type="text"
                      class="form-control"
                      id="userID"
                      value={userID}
                      name="userID"
                      onChange={(e) => {
                        setUserID(e.target.value);
                      }}
                      required
                      aria-describedby="userHelp" />

                  </div>
                  <div class="form-group">
                    <label for="password_field">Password</label>
                    <input type="password"
                      class="form-control"
                      required
                      value={password}
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }} />
                  </div>

                  <button type="submit" class="btn btn-primary custom-btn-signIn" >Sign In</button>
                </form>

                <div class="row">
                  <div class="col-md-4 mt-2">
                    <div class="form-group form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                      <label class="form-check-label" for="exampleCheck1">Remember me</label>
                    </div>
                  </div>
                  <div class="col-md-4"></div>
                  <div class="col-md-4 mt-2">
                    <span>Not a member? </span>
                  </div>
                </div>
                <div class="custom-bottem mt-2">
                  <div class='row'>
                    <div class='col-md-6'>
                      <span ><Link to="registerStudent" style={{ textDecoration: 'none' }}>Register As Student</Link> </span>
                    </div>
                    <div class='col-md-6'>
                      <span ><Link to="registerStaff" style={{ textDecoration: 'none' }}>Register As Staff Member</Link> </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>

    </div>
  );
}

export default Login;
