import React, { useState, useEffect, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../../../style/styles.scss'
import { useNavigate } from 'react-router-dom';
import UserSideBar from '../../../layout/UserSideBar';
import Submission from './Submission';


function SubmissionList(props) {
    const [user, setUser] = useState({});
    const [submissionList, setSubmissionList] = useState([]);

    useEffect(() => {

        try {
            const jwt = localStorage.getItem("token");
            setUser(jwtDecode(jwt));
        } catch (error) {

        }
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/submissions/getSubmissionsUsingGroupID/" + user.groupID)
            .then((res) => {
                setSubmissionList(res.data);
            })

            .catch((err) => {
                console.log(err);
            });
    }, [user]);



    console.log("Component is rendered")


    return (
        <React.Fragment>

            <div className='row'>
                <div className='col-md-2'>
                    {/*  StudentSideBar*/}
                    <UserSideBar />
                </div>
                <div className='col-md-10'>
                    {/*  content*/}
                    <div className="container">
                        <div className="main-content">

                            {
                                submissionList.map(function (submission) {
                                    return <Submission {...submission} />
                                })};
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );

};

export default SubmissionList;
