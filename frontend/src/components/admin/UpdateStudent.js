import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminSideBar from "../layout/AdminSideBar";


function UpdateStudent() {
  const [loading, setLoading] = useState(false);

  const paramID = useParams("");

  const [name, setStudentName] = useState("");
  const [idNumber, setStudentID] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const role = "student";

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      idNumber,
      degree,
      specialization,
      email
    };

    axios
      .put(
        "http://localhost:4000/api/v1/students/update/" + paramID.id,
        newStudent
      )
      .then((res) => {
        console.log(res);
        console.log("Student Updated!!");

        setLoading(false);
        setShowText(true);
      })
      .catch((err) => {
        alert(err);
      });

    navigate("/admin/students");

    setStudentName("");
    setStudentID("");
    setDegree("");
    setSpecialization("");
    setPassword("");
    setEmail("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/students/get/" + paramID.id)
      .then((res) => {
        console.log(res.data);
        setStudentName(res.data.name);
        setStudentID(res.data.idNumber);
        setDegree(res.data.degree);
        setSpecialization(res.data.specialization);
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
                    <h2 class="mb-4 text-center">{idNumber} Details</h2>

                    <form onSubmit={handleSubmit} id="form">

                      <div class="form-row">
                        <div class="col">
                          <label for="inputName">Student Name</label>
                          <input type="text"
                            class="form-control"
                            value={name}
                            required
                            readOnly
                          />
                        </div>
                        <div class="col">
                          <label for="inputIdNumber">ID Number</label>
                          <input type="text"
                            class="form-control"
                            value={idNumber}
                            required
                            readOnly
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
                          <label for="inputSpecializaion">Specialization</label>
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
                          <label for="inputEmail">Email</label>
                          <input type="email"
                            class="form-control"
                            value={email}
                            required
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

export default UpdateStudent;
