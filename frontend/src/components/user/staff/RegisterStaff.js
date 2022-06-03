import axios from "axios";
import { useState } from "react";
import Loader from "../../layout/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function RegisterStaff() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [idNumber, setID] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [researchInterest, setresearchInterest] = useState("");
  const [showText, setShowText] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();


  const handleChangeFaculty = (event) => {
    setFaculty(event.target.value);
  };

  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleChangeUserType = (event) => {
    setType(event.target.value);
    setRole(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setShowText(false);
      setLoading(true);

      const newStaff = {
        name,
        idNumber,
        faculty,
        department,
        researchInterest,
        type,
        email
      };
      const userID = idNumber;
      const newLogin = {
        userID,
        password,
        role,
      };

      axios
        .post(
          "http://localhost:4000/api/v1/staff/registerStaffMember",
          newStaff
        )
        .then((res) => {
          console.log(res);
          console.log("Staff Member Added!!");

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
          console.log("Staff Login Added!!");

          setLoading(false);
          setShowText(true);
        })
        .catch((err) => {
          alert(err);
        });

      Swal.fire("Registration Succesfull!", "Click ok to Continue", "success");

      navigate("/");

      setName("");
      setID("");
      setFaculty("");
      setDepartment("");
      setPassword("");
      setType("");
      setresearchInterest("");
      setEmail("");
    } else {
      Swal.fire({
        title: "Incorrect Password!!",
        text: "Please enter your password again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div className="row" style={{ height: "15px" }}></div>
      
      <div class="container">
        <div class="row mt-5 mb-5">
          <div class="col-md-2"></div>
          <div class="col-md-8">

            <div class="card ">

              <div class="card-body">
                <h2 class="mb-4 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data" >

                  <div class="form-row">
                    <div class="col">
                      <label for="inputName">Name</label>
                      <input type="text"
                        class="form-control"
                        value={name}
                        required
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="inputIdNumber">Staff ID</label>
                      <input type="text"
                        class="form-control"
                        // pattern="[E|I|B][N|T|M][0-9]{8}"
                        // title="Enter Valid Staff ID"
                        value={idNumber}
                        required
                        onChange={(e) => {
                          setID(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div class="form-row mt-2">
                    <div class="col">
                      <label for="inputFaculty">Select Faculty</label>
                      <select id="inputState"
                        value={faculty}
                        onChange={handleChangeFaculty}
                        required
                        class="form-control">
                        <option selected>Choose...</option>
                        <option value={"Faculty of Computing"}>Faculty of Computing</option>
                        <option value={"Faculty of Engineering"}>Faculty of Engineering</option>
                        <option value={"Faculty of Buisness"}> Faculty of Buisness</option>                       
                      </select>
                    </div>

                    <div class="col">
                      <label for="inputDepartment"> Select Department</label>
                      <select id="inputState"
                        value={department}
                        onChange={handleDepartment}
                        required
                        class="form-control">
                        <option selected>Choose...</option>
                        <option value={"Computer Science and Software Engineering"}>Computer Science and Software Engineering</option>
                        <option value={"Cyber Sequrity"}>Cyber Sequrity</option>
                        <option value={"Information Technology"}>Information Technology</option>
                        <option value={"Data Science"}>Data Science</option>
                        <option value={"Electrical & Electronic Engineeringy"}>Electrical & Electronic Engineering</option>
                        <option value={"Civil Engineeringy"}>Civil Engineering</option>
                        <option value={"Buisness"}>Buisness</option>
                        <option value={"Other"}>Other</option>
                      </select>

                    </div>
                  </div>

                  <div class="form-row mt-2">
                    <div class="form-group col-md-6">
                      <label for="inputStaffType">Select Staff Type</label>
                      <select id="inputState"
                        value={type}
                        onChange={handleChangeUserType}
                        required
                        defaultValue={"supervisor"}
                        class="form-control">
                        <option selected>Choose...</option>
                        <option value={"supervisor"}>Supervisor</option>
                        <option value={"supervisor"}>Co-Supervisor</option>
                        <option value={"panel_member"}>Panel Member</option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputResearchInterest">research Interest</label>
                      <input type="text"
                        class="form-control"
                        value={researchInterest}
                        required
                        onChange={(e) => {
                          setresearchInterest(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div class="form-row">

                    <div class="col">
                      <label for="inputName">Email</label>
                      <input type="email"
                        class="form-control"
                        // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                        placeholder="example@gamil.com"
                        // title="Enter Valid E-mail address"
                        value={email}
                        required
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    
                  </div>


                  <div class="form-row">
                    <div class="col">
                      <label for="inputPassword">Password</label>
                      <input type="password"
                        class="form-control"
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        value={password}
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="inputConfirmPassword">Confirm Password</label>
                      <input type="password"
                        class="form-control"
                        value={confirmPassword}
                        required
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      />
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

export default RegisterStaff;
