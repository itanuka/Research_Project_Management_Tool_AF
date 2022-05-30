import axios from "axios";
import { useState } from "react";
import Loader from "../../layout/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function RegisterStudent() {
  const [loading, setLoading] = useState(false);

  const [name, setStudentName] = useState("");
  const [idNumber, setStudentID] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const role = "student";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setShowText(false);
      setLoading(true);

      const newStudent = {
        name,
        idNumber,
        degree,
        specialization,
        password,
      };
      const userID = idNumber;
      const newLogin = {
        userID,
        password,
        role,
      };

      axios
        .post("http://localhost:4000/api/v1/students/registerStudent", newStudent)
        .then((res) => {
          console.log(res);
          console.log("Student Added!!");

          setLoading(false);
          setShowText(true);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .post("http://localhost:4000/api/v1/users/add/", newLogin)
        .then((res) => {
          console.log(res);
          console.log("Student Login Added!!");

          setLoading(false);
          setShowText(true);
        })
        .catch((err) => {
          alert(err);
        });

      Swal.fire("Registration Succesfull!", "Click ok to Continue", "success");

      navigate("/");

      setStudentName("");
      setStudentID("");
      setDegree("");
      setSpecialization("");
      setPassword("");
    } else {
      Swal.fire({
        title: "Passowrds Not Matched!!",
        text: "Please enter your password again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div class="container">
        <div class="row mt-5 mb-5">
          <div class="col-md-2"></div>
          <div class="col-md-8">

            <div class="card ">
              <div class="card-body">
                <h2 class="mb-4">Sign Up</h2>

                <form onSubmit={handleSubmit} id="form">

                  <div class="form-row">
                    <div class="col">
                      <label for="inputStudentName">Student Name</label>
                      <input type="text"
                        class="form-control"
                        value={name}
                        required
                        onChange={(e) => {
                          setStudentName(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="inputIdNumber">ID Number</label>
                      <input type="text"
                        class="form-control"
                        value={idNumber}
                        required
                        onChange={(e) => {
                          setStudentID(e.target.value);
                        }}
                      />
                    </div>
                  </div>



                  <div class="form-row">
                    <div class="col">
                      <label for="inputDegree">Degree</label>
                      <input type="text"
                        class="form-control"
                        value={degree}
                        required
                        onChange={(e) => {
                          setDegree(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="inputSpecialization">Specialization</label>
                      <input type="text"
                        class="form-control"
                        value={specialization}
                        required
                        onChange={(e) => {
                          setSpecialization(e.target.value);
                        }}
                      />
                    </div>
                  </div>


                  <div class="form-row">
                    <div class="col">
                      <label for="inputPassword">Password</label>
                      <input type="password"
                        class="form-control"
                        value={password}
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }} />
                    </div>
                    <div class="col">
                      <label for="inputConfirmPassword">Confirm Password</label>
                      <input type="password"
                        class="form-control"
                        value={confirmPassword}
                        required
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }} />
                    </div>
                  </div>


                  <button type="submit" class="btn btn-primary mt-4"
                    style={{ width: '100%', height: '40px' }}
                    disabled={loading ? true : false}
                  >Sign Up</button>
                </form>

                <div class="custom-bottem mt-2">
                  <span>Already a member? </span><span><a href="/" style={{ textDecoration: 'none' }} >Sign
                    In</a>
                  </span>
                </div>
              </div>
            </div>


          </div>
          <div class="col-md-2"></div>

        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
