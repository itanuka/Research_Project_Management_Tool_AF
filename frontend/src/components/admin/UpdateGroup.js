

import axios from "axios";
import { useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import AdminSideBar from '../layout/AdminSideBar'

function UpdateGroup() {
    const [loading, setLoading] = useState(false);

    const paramID = useParams("");

    const [groupName, setGroupName] = useState("");
    const [firstMemberID, setFirstMemberID] = useState("");
    const [secondMemberID, setSecondMemberID] = useState("");
    const [thirdMemberID, setThirdMemberID] = useState("");
    const [fourthMemberID, setFourthMemberID] = useState("");

    const navigate = useNavigate();

    const role = "group";


    const handleSubmit = (e) => {
        e.preventDefault();

        const newGroup = {
            groupName,
            firstMemberID,
            secondMemberID,
            thirdMemberID,
            fourthMemberID,
        };

        axios
            .put(
                "http://localhost:4000/api/v1/groups/update/" + paramID.id,
                newGroup
            )
            .then((res) => {
                console.log(res);
                console.log("Group Updated!!");

                setLoading(false);
            })
            .catch((err) => {
                alert(err);
            });

        navigate("/admin/groups");

        setGroupName("");
        setFirstMemberID("");
        setSecondMemberID("");
        setThirdMemberID("");
        setFourthMemberID("");
    };

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/groups/get/" + paramID.id)
            .then((res) => {
                setGroupName(res.data.groupName);
                setFirstMemberID(res.data.firstMember.idNumber);
                setSecondMemberID(res.data.secondMember.idNumber);
                setThirdMemberID(res.data.thirdMember.idNumber);
                setFourthMemberID(res.data.fourthMember.idNumber);
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
                                        <h2 class="mb-4">Update Group</h2>

                                        <form onSubmit={handleSubmit} id="form">

                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputGroupName">Group Name</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={groupName}
                                                        required
                                                        onChange={(e) => {
                                                            setGroupName(e.target.value);
                                                        }}
                                                    />
                                                </div>

                                            </div>


                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputFirstMemberID">Member 1 ID</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={firstMemberID}
                                                        required
                                                        onChange={(e) => {
                                                            setFirstMemberID(e.target.value);
                                                        }}
                                                    />
                                                </div>

                                                <div class="col">
                                                    <label for="inputSecondMemberID">Member 2 ID</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={secondMemberID}
                                                        required
                                                        onChange={(e) => {
                                                            setSecondMemberID(e.target.value);
                                                        }}
                                                    />
                                                </div>

                                            </div>

                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputThirdMemberID">Member 3 ID</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={thirdMemberID}
                                                        required
                                                        onChange={(e) => {
                                                            setThirdMemberID(e.target.value);
                                                        }}
                                                    />
                                                </div>

                                                <div class="col">
                                                    <label for="inputFourthMemberID">Member 4 ID</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={fourthMemberID}
                                                        required
                                                        onChange={(e) => {
                                                            setFourthMemberID(e.target.value);
                                                        }}
                                                    />
                                                </div>

                                            </div>


                                            <button type="submit" class="btn btn-primary mt-4"
                                                style={{ width: '100%', height: '40px' }}
                                                disabled={loading ? true : false}
                                            >Update Group</button>
                                        </form>

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

export default UpdateGroup;
