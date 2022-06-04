import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import download from 'downloadjs';
import '../../../style/styles.scss'




function ViewTopic(props) {
    const [filesList, setFilesList] = useState({});
    const [errorMsg, setErrorMsg] = useState('');



    useEffect(() => {
        const getFilesList = async () => {
            const user = props.user;
            const data = props.topic
            setErrorMsg('');
            setFilesList(data);


        };

        getFilesList();
    }, [props]);

    const downloadFile = async (id, path, mimetype) => {
        try {
            const result = await axios.get(`http://localhost:4000/download/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            setErrorMsg('');
            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg('Error while downloading file. Try again later');
            }
        }
    };









    return (
        <React.Fragment>
            <div>


                <div className='row'>
                    <div className='col-2'>

                    </div>
                    <div className='col-10'>

                        <div className="files-container mt-5" >
                            {errorMsg && <p className="errorMsg">{errorMsg}</p>}

                            <div class="card text-white bg-dark" style={{ width: "500px", height: "300px" }}>


                                <div class="card-body">

                                    <h5 class="card-header text-center font-weight-bolder" >Research Project Topic</h5>



                                    <ul className='mt-5 ml-5 pl-5'>

                                        <li>Title : {filesList.title}</li>

                                        <li>Group Name: {filesList.groupName}</li>

                                        <li>Status: {filesList.status}</li>

                                    </ul>

                                    <a href="#/" class="btn btn-success d-flex justify-content-center mt-5 ml-5 mr-5" style={{ textDecoration: "none" }} onClick={() =>

                                        downloadFile(filesList._id, filesList.file_path, filesList.file_mimetype)

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

export default ViewTopic;
