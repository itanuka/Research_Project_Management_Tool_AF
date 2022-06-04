
import React, { Fragment, useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import '../style/header.css'
import Swal from 'sweetalert2';




function Header() {

    const [user, setUser] = useState({});
    const [id, setId] = useState("");

    useEffect(() => {

        try {
            const jwt = localStorage.getItem("token");
            setUser(jwtDecode(jwt));
        } catch (error) {

        }
    }, []);

    const handleMyClick = (e) => {
        e.preventDefault();

        if (user.role == "student") {
            axios
                .get("http://localhost:4000/api/v1/students/getStudentUsingUserID/" + user.userID)
                .then((res) => {

                    setId(res.data._id.toString());
                })

                .catch((err) => {
                    console.log(err);
                });

        }

        if (user.role == "supervisor") {
            axios
                .get("http://localhost:4000/api/v1/staff/getStaffUsingUserID/" + user.userID)
                .then((res) => {

                    setId(res.data._id.toString());
                })

                .catch((err) => {
                    console.log(err);
                });

        }

        if (user.role == "panel_member") {
            axios
                .get("http://localhost:4000/api/v1/staff/getStaffUsingUserID/" + user.userID)
                .then((res) => {

                    setId(res.data._id.toString());
                })

                .catch((err) => {
                    console.log(err);
                });

        }



    };

    useEffect(() => {
        if (user.role == "student") {
            navigateLink = "/students/view/" + id;
            navigate(navigateLink);
        }

        if (user.role == "supervisor") {
            navigateLink = "/staff/view/" + id;
            navigate(navigateLink);
        }

        if (user.role == "panel_member") {
            navigateLink = "/staff/view/panelMember/" + id;
            navigate(navigateLink);
        }

    }, [id]);



    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        Swal.fire({
            title: 'Logout Successfully',
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }).then((value) =>{
            Swal.fire((  window.location = "/"));
          });
       
    }
    return (
        <Fragment>
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark " style={{ background: '#232f3e' }}>
                    <a class="navbar-brand" href="#">Project Management Tool</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center mr-5" id="navbarSupportedContent">
                        <ul class="navbar-nav ">


                            {/* LOGIC */}
                            {localStorage.getItem("token") ?
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="" onClick={handleMyClick}>{user.userID}</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="#" onClick={logout}>Log Out</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="#">Login</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="#">Sign Up</Link>
                                    </li>
                                </>}



                        </ul>
                    </div>
                </nav>
            </header>

        </Fragment>);
}



export default Header