import React, { useState, useEffect, useRef } from 'react';
import download from 'downloadjs';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../../../style/styles.scss'
import { useNavigate } from 'react-router-dom';
import UserSideBar from '../../../layout/UserSideBar'


function Submission(props) {

    const downloadFile = async (id, path, mimetype) => {
        try {
            const result = await axios.get(`http://localhost:4000/download/submission/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            // setErrorMsg('');
            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // setErrorMsg('Error while downloading file. Try again later');
            }
        }
    };
    // useEffect(() => {

    //     try {
    //         const jwt = localStorage.getItem("token");
    //         setUser(jwtDecode(jwt));
    //     } catch (error) {

    //     }
    // }, []);
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:4000//api/v1/submissions/getSubmissionsUsingGroupID/" + user.groupID)
    //         .then((res) => {
    //             setSubmissionList(res.data);
    //         })

    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [props]);


    return (
        <React.Fragment>

            <div>


                <div className='row'>
                    <div className='col-2'>

                    </div>
                    <div className='col-10'>

                        <div className="files-container mt-5" >
                            {/* {errorMsg && <p className="errorMsg">{errorMsg}</p>} */}

                            <div class="card text-white bg-dark" style={{ width: "500px", height: "300px" }}>


                                <div class="card-body">

                                    <h5 class="card-header text-center font-weight-bolder" >Card title</h5>



                                    <ul className='mt-5 ml-5 pl-5'>

                                        {/* <li>Title : {filesList.title}</li> */}
                                        <li>Template Name: {props.templateName}</li>

                                        <li>Deadline: {props.deadline}</li>

                                        <li>Group Name: {props.groupName}</li>

                                        <li>Submitted By: {props.submittedBy}</li>

                                    </ul>

                                    <a href="#/" class="btn btn-success d-flex justify-content-center mt-5 ml-5 mr-5" style={{ textDecoration: "none" }} onClick={() =>

                                        downloadFile(props._id, props.file_path, props.file_mimetype)

                                    }

                                    >

                                        Download

                                    </a>



                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </React.Fragment>
    );

};

export default Submission;
