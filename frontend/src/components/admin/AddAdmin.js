import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/layout/Loader";
import AdminSideBar from "../layout/AdminSideBar";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddAdmin() {
  const [loading, setLoading] = useState(false);

  const [idNumber, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const role = "admin";


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setShowText(false);
      setLoading(true);

      const userID = idNumber;
      const newLogin = {
        userID,
        password,
        role,
      };

      axios
        .post("http://localhost:4000/api/v1/users/add/", newLogin)
        .then((res) => {
          console.log(res);
          console.log("Success!!");

          setLoading(false);
          setShowText(true);
        })
        .catch((err) => {
          alert(err);
        });

      Swal.fire("Admin Added!!", "Click ok to Continue", "success");

      navigate("/admin-home");

      setAdminID("");
      setPassword("");
    } else {
      Swal.fire({
        title: "Passowrds Not Matched!!",
        text: "Please enter your password again.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setConfirmPassword("");
    }
  };

  return (
    <div>


      <div className="row">
        <div className="col-2">
          <AdminSideBar />
        </div>
        <div className="col-10">
        <div className="row" style={{ height: "50px" }}></div>

          <div class="container body">
            <div class="row mt-5 mb-5">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <div class="card ">
                  <div class="card-body">
                    <h2 class="mb-4 text-center">Add New Admin</h2>

                    <form onSubmit={handleSubmit}>

                      <div class="form-group ">
                        <label for="adminId">Admin ID</label>
                        <input type="text"
                          class="form-control"
                          value={idNumber}
                          required
                          onChange={(e) => {
                            setAdminID(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label for="password_field">Password</label>
                        <input type="password"
                          class="form-control"
                          value={password}
                          required
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }} />
                      </div>

                      <div class="form-group">
                        <label for="password_field">Confirm Password</label>
                        <input type="password"
                          class="form-control"
                          value={confirmPassword}
                          required
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }} />
                      </div>

                      <button type="submit" class="btn btn-primary custom-btn-signIn" >Register New Admin</button>
                    </form>

                  </div>
                </div>
              </div>
              <div class="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AddAdmin;
