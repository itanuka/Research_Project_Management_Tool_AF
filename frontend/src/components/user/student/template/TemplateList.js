import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import download from 'downloadjs';
import axios from 'axios';
// import { API_URL } from '../../utils/constants';
import UserSideBar from "../../../layout/UserSideBar";
import Swal from "sweetalert2";

const TemplateList = () => {
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const [searchKeyword, setSearchKeyword] = useState("")

    const filterTemplate = filesList.filter((item) => {
        return item.templateName.toLowerCase().includes(searchKeyword.toLowerCase())
    })

    const navigate = useNavigate();

    useEffect(() => {
        const getFilesList = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/templates/');
                setErrorMsg('');
                setFilesList(data);
            } catch (error) {
                error.response && setErrorMsg(error.response.data);
            }
        };

        getFilesList();
    }, []);

    const downloadFile = async (id, path, mimetype) => {
        try {
            const result = await axios.get(`http://localhost:4000/download/template/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];

            Swal.fire("Template file is Downloaded!!", "Click ok to Continue", "success");
            setErrorMsg('');

            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                //setErrorMsg('Error while downloading file. Try again later');
                Swal.fire("Error while downloading file. Try again later!!", "Click ok to Continue", "success");
            }
        }
    };

    const navigateToSubmissions = async (id) => {
        navigate(`/student/group/submissions/${id}`);
    }




    return (

        <div>

            <div className='row'>
                <div className='col-2'>
                    {/*  panel member sidebar */}
                    <UserSideBar />
                </div>
                <div className='col-10'>

                    <div className="files-container">
                        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                        <input className='mt-5' placeholder="Search by GroupName" style={{ marginLeft: "79%", width: "12vw" }} onChange={(e) => {
                            setSearchKeyword(e.target.value)
                        }} />


                        <table className='table mt-5 container'>
                            <thead>
                                <th>Template Name</th>
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Download File</th>
                                <th>Submit Answers</th>
                            </thead>

                            <tbody>
                                {filterTemplate.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.templateName}</td>
                                            <td>{item.description}</td>
                                            <td>{item.deadline}</td>

                                            <td> <a href="#/" style={{ textDecoration: "none" }} onClick={() =>
                                                downloadFile(item._id, item.file_path, item.file_mimetype)
                                            }
                                            >
                                                Download
                                            </a></td>
                                            <td>

                                                <button onClick={() =>
                                                    navigateToSubmissions(item._id)
                                                } className='btn btn-success p-1'>Submit Answers</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>


                    </div>

                </div>
            </div>










        </div>

    );
};

export default TemplateList;
