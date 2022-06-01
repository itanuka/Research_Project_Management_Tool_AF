import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../layout/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserSideBar from "../../layout/UserSideBar";


function ViewStudentProfile() {
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

        console.log(paramID);

        navigateLink = "/students/update/" + paramID.id;
        navigate(navigateLink);

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
                // console.log(res.data);
                setStudentName(res.data.name);
                setStudentID(res.data.idNumber);
                setDegree(res.data.degree);
                setSpecialization(res.data.specialization);
                setPassword(res.data.password);
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
                    <UserSideBar />
                </div>
                <div className="col-10">
                <div className="row" style={{ height: "60px" }}></div>

                    <div class="container">
                        <div class="row mt-5 mb-5">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">

                                <div class="card ">
                                    <div class="card-body">
                                        <h2 class="mb-4 text-center">My Profile</h2>

                                        <form onSubmit={handleSubmit} id="form">

                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputName">Student Name</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={name}
                                                        required
                                                        readOnly />
                                                </div>
                                                <div class="col">
                                                    <label for="inputIdNumber">Student ID</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={idNumber}
                                                        required
                                                        readOnly />
                                                </div>
                                            </div>


                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputDegree">Degree</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={degree}
                                                        required
                                                        readOnly />
                                                </div>
                                                <div class="col">
                                                    <label for="inputSpecialization">Specialization</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={specialization}
                                                        required
                                                        readOnly />
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputPassword">Password</label>
                                                    <input type="password"
                                                        class="form-control"
                                                        value={password}
                                                        required
                                                        readOnly />
                                                </div>
                                                <div class="col">
                                                    <label for="inputLastName">Email</label>
                                                    <input type="email"
                                                        class="form-control"
                                                        value={email}
                                                        readOnly
                                                        required />
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

export default ViewStudentProfile;
