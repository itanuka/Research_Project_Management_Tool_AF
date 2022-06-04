import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../layout/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PanelMemberSideBar from "../../layout/PanelMemberSideBar";
import Swal from "sweetalert2";


function UpdatePanelMemberProfile() {
    const [loading, setLoading] = useState(false);

    const paramID = useParams("");

    const [name, setName] = useState("");
    const [idNumber, setID] = useState("");
    const [faculty, setFaculty] = useState("");
    const [department, setDepartment] = useState("");
    const [type, setType] = useState("");
    const [researchInterest, setresearchInterest] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    const handleChangeResearchInterest = (event) => {
        setresearchInterest(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
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
            type,
            researchInterest,
            password,
            confirmPassword,
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
        setPassword("");
        setConfirmPassword("");
        setEmail("");

        Swal.fire({
            title: 'Update Successfully',
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }).then((value) =>{
            Swal.fire((  window.location = "/panelMember"));
          });
       
    };

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/staff/get/" + paramID.id)
            .then((res) => {
                setName(res.data.name);
                setID(res.data.idNumber);
                setFaculty(res.data.faculty);
                setDepartment(res.data.department);
                setType(res.data.type);
                setresearchInterest(res.data.researchInterest);
                setPassword(res.data.password);
                setConfirmPassword(res.data.confirmPassword);
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
                    <div className="row" style={{ height: "10px" }}></div>
                    <div class="container">

                        <div class="row mt-5 mb-5">
                            <div class="col-md-2"></div>
                            <div class="col-md-8">

                                <div class="card ">
                                    <div class="card-body">
                                        <h2 class="mb-4 text-center">Update My Profile</h2>

                                        <form onSubmit={handleSubmit} encType="multipart/form-data">

                                            <div class="form-row">
                                                <div class="col">
                                                    <label for="inputName">Name</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        value={name}
                                                    />
                                                </div>
                                                <div class="col">
                                                    <label for="inputIdNumber">Staff ID</label>
                                                    <input type="text"
                                                        class="form-control"
                                                        // pattern="[E|I|B][N|T|M][0-9]{8}"
                                                        // title="Enter Valid Staff ID"
                                                        value={idNumber}
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
                                                        onChange={handleChangeResearchInterest}
                                                    />
                                                </div>
                                            </div>

                                            <div class="form-row mt-2">
                                                <div class="col">
                                                    <label for="inputEmail">Email</label>
                                                    <input type="email"
                                                        class="form-control"
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                                                        placeholder="example@gamil.com"
                                                        title="Enter Valid E-mail address"
                                                        value={email}
                                                        onChange={handleChangeEmail}

                                                    />
                                                </div>
                                            </div>

                                            <div class="form-row mt-2">
                                                <div class="form-group col-md-6">
                                                    <label for="inputPassword">Password</label>
                                                    <input type="password"
                                                        class="form-control"
                                                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                                        // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                                        value={password}
                                                        onChange={handleChangePassword}
                                                    />
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="inputConfirmPassword">Confirm Password</label>
                                                    <input type="password"
                                                        class="form-control"
                                                        value={confirmPassword}
                                                        onChange={handleChangeConfirmPassword}
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

export default UpdatePanelMemberProfile;
