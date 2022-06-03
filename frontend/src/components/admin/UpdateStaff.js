
import axios from "axios";
import { useEffect, useState } from "react";
import AdminSideBar from "../layout/AdminSideBar";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


function UpdateStaff() {
  const [loading, setLoading] = useState(false);

  const paramID = useParams("");

  const [name, setName] = useState("");
  const [idNumber, setID] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [researchInterest, setresearchInterest] = useState("");
  const [email, setEmail] = useState("");

  const [showText, setShowText] = useState(false);
  const [role, setRole] = useState("");

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

    axios
      .put("http://localhost:4000/api/v1/staff/update/" + paramID.id, newStaff)
      .then((res) => {
        console.log(res);
        console.log("Update Successfuly!!");

        setLoading(false);
        setShowText(true);
      })
      .catch((err) => {
        alert(err);
      });

    setName("");
    setID("");
    setFaculty("");
    setDepartment("");
    setType("");
    setresearchInterest("");
    setEmail("");


    Swal.fire({
      title: 'Update Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    })
    navigate("/admin/staff");
    
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/staff/get/" + paramID.id)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setID(res.data.idNumber);
        setFaculty(res.data.faculty);
        setDepartment(res.data.department);
        setType(res.data.type);
        setresearchInterest(res.data.researchInterest);
        setEmail(res.data.email);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>

      <div className="row">
        <div className="col-2">
          <AdminSideBar />
        </div>
        <div className="col-10">
          <div className="row" style={{ height: "50px" }}></div>
          <div class="container">

            <div class="row mt-5 mb-5">
              <div class="col-md-2"></div>
              <div class="col-md-8">

                <div class="card ">
                  <div class="card-body">
                    <h2 class="mb-4 text-center">{idNumber} Member Details</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                      <div class="form-row">
                        <div class="col">
                          <label for="inputName">Name</label>
                          <input type="text"
                            class="form-control"
                            value={name}
                            readOnly
                          />
                        </div>
                        <div class="col">
                          <label for="inputIdNumber">ID Number</label>
                          <input type="text"
                            class="form-control"
                            value={idNumber}
                            readOnly
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
                            <option value={"Faculty of Health and Science"}> Faculty of Health and Science</option>
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
                            <option value={"Electrical & Electronic Engineeringy"}>Electrical & Electronic Engineeringy</option>
                            <option value={"Civil Engineeringy"}>Civil Engineeringy</option>
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
                            readOnly
                          />
                        </div>
                      </div>

                      <div class="form-row mt-2">
                        <div class="col">
                          <label for="inputEmail">Email</label>
                          <input type="email"
                            class="form-control"
                            value={email}
                            readOnly

                          />
                        </div>
                      </div>

                      <button type="submit" class="btn btn-primary mt-4"
                        style={{ width: '100%', height: '40px' }}
                        disabled={loading ? true : false}
                      >UPDATE</button>
                    </form>

                    <div class="custom-bottem mt-2">
                    </div>
                  </div>
                </div>


              </div>
              <div class="col-md-2"></div>

            </div>
          </div>
        </div>
      </div>








    </div>
  );
}

export default UpdateStaff;
