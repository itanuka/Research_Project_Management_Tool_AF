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
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleChangeDegree = (event) => {
    setDegree(event.target.value);
  };

  const handleChangeSpecialization = (event) => {
    setSpecialization(event.target.value);
  };

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
        email
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
      setEmail("");
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

      <div className="row" style={{ height: "60px" }}></div>
      <div class="container">
        <div class="row mt-5 mb-5">
          <div class="col-md-2"></div>
          <div class="col-md-8">

            <div class="card ">
              <div class="card-body">
                <h2 class="mb-4 text-center">Sign Up</h2>

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
                      <label for="inputIdNumber">Student ID</label>
                      <input type="text"
                        class="form-control"
                        // pattern="[E|I|B][N|T|M][0-9]{8}"
                        // title="Enter Valid Student ID"
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
                      <label for="inputDegree">Select Degree</label>
                      <select id="inputState"
                        value={degree}
                        onChange={handleChangeDegree}
                        required
                        class="form-control">
                        <option selected>Choose...</option>
                        <option value={"Software Enginnering"}>Software Engineering</option>
                        <option value={"Information Technology"}>Information Technology</option>
                        <option value={"Cyber Sequrity"}> Cyber Sequrity</option>
                        <option value={"Data Science"}> Data Science</option>
                        <option value={"Electrical & Electronic Engineering"}> Electrical & Electronic Engineering</option>
                        <option value={"Civil Engineering"}> Civil Engineering</option>
                        <option value={"Buisness Management"}> Buisness Management</option>
                        <option value={"Other"}> Other</option>

                      </select>

                    </div>
                    <div class="col">
                      <label for="inputSpecialization">Select Specialization</label>
                      <select id="inputState"
                        value={specialization}
                        onChange={handleChangeSpecialization}
                        required
                        class="form-control">
                        <option selected>Choose...</option>
                        <option value={"BSC (hons) in Information Technology"}>BSC (hons) in Information Technology</option>
                        <option value={"BSC (Computing)"}>BSC (Computing)</option>
                        <option value={"BSE ENG (hons)"}> BSE ENG (hons)</option>
                        <option value={"BBA(hons)"}> BBA(hons)</option>
                        <option value={"Other"}> Other</option>

                      </select>


                    </div>
                  </div>


                  <div class="form-row">
                    <div class="col">
                      <label for="inputEmail">Email</label>
                      <input type="email"
                        class="form-control"
                        // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        // title="Enter Valid E-mail address"
                        placeholder="example@gamil.com"
                        value={email}
                        required
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }} />
                    </div>
                  </div>


                  <div class="form-row">
                    <div class="col">
                      <label for="inputPassword">Password</label>
                      <input type="password"
                        class="form-control"
                        value={password}
                        required
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
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
