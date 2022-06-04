import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../layout/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PanelMemberSideBar from "../../layout/PanelMemberSideBar";


export default function ViewPanelMemberProfile() {
    const [loading, setLoading] = useState(false);

    const paramID = useParams("");

    const [name, setName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [faculty, setFaculty] = useState("");
    const [department, setDepartment] = useState("");
    const [researchInterest, setResearchInterest] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(paramID);

        navigateLink = "/staff/update/panelMember/" + paramID.id;
        navigate(navigateLink);

        setName("");
        setIdNumber("");
        setFaculty("");
        setDepartment("");
        setResearchInterest("");
        setPassword("");
        setEmail("");
    };

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/staff/get/" + paramID.id)
            .then((res) => {
                // console.log(res.data);
                setName(res.data.name);
                setIdNumber(res.data.idNumber);
                setFaculty(res.data.faculty);
                setDepartment(res.data.department);
                setResearchInterest(res.data.researchInterest);
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
                    <PanelMemberSideBar />
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
                                                    <label for="inputName">Name</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={name}
                                                        required
                                                        readOnly
                                                    />
                                                </div>
                                                <div class="col">
                                                    <label for="inputIdNumber">Staff ID</label>
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
                                                    <label for="inputFaculty">Faculty</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={faculty}
                                                        required
                                                        readOnly
                                                    />
                                                </div>
                                                <div class="col">
                                                    <label for="inputDepartment">Department</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={department}
                                                        required
                                                        readOnly
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

                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputResearchInterst">Research Interest</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={researchInterest}
                                                        required
                                                        readOnly
                                                    />
                                                </div>
                                                <div class="col">
                                                    <label for="inputPassword">Password</label>
                                                    <input type="password"
                                                        class="form-control"
                                                        value={password}
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
    )
}
