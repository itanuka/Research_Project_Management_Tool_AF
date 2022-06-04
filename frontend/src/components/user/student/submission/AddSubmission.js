import React, { useState, useEffect, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../../../style/styles.scss'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import UserSideBar from '../../../layout/UserSideBar'
import Swal from 'sweetalert2';
// import { API_URL } from '../../utils/constants';


function AddSubmission() {
    let navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [groupName, setGroupName] = useState('');
    const [submittedBy, setSubmittedBy] = useState('');
    const [groupID, setGroupID] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
    const dropRef = useRef();
    const { templateId } = useParams();

    useEffect(() => {

        axios
            .get("http://localhost:4000/api/v1/templates/" + templateId)
            .then((res) => {
                setTemplateName(res.data.templateName);
                setDeadline(res.data.deadline);
            })

            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {

        try {
            const jwt = localStorage.getItem("token");
            const user = jwtDecode(jwt);
            setGroupName(user.groupName);
            setSubmittedBy(user.userID);
            setGroupID(user.groupID);

        } catch (error) {

        }
    }, []);

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
    };

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
            dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
            dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            if (templateId.trim() !== '' && templateName.trim() !== '' && deadline.trim() !== '' && groupName.trim() !== '' && submittedBy.trim() !== '') {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('templateId', templateId);
                    formData.append('templateName', templateName);
                    formData.append('deadline', deadline);
                    formData.append('groupName', groupName);
                    formData.append('submittedBy', submittedBy);
                    formData.append('groupID', groupID);

                    setErrorMsg('');
                    await axios.post('http://localhost:4000/upload/submission', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('works fine to this point')
                    Swal.fire({
                        title: 'Submited Successfully',
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                      })
                    navigate('/student')
                } else {
                    setErrorMsg('Please select a file to add.');
                }
            } else {
                setErrorMsg('Please enter all the field values.');
            }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

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
                            <Form className="search-form" onSubmit={handleOnSubmit}>
                                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                                <Row>
                                    <Col>
                                        <Form.Group controlId="title">
                                            <Form.Control
                                                type="text"
                                                name="templateName"
                                                value={templateName}
                                                placeholder="Template Name"
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="title">
                                            <Form.Control
                                                type="text"
                                                name="deadline"
                                                value={deadline}
                                                placeholder="Deadline"
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="title">
                                            <Form.Control
                                                type="text"
                                                name="groupName"
                                                value={groupName}
                                                placeholder="Group Name"
                                                onChange={(e) => {
                                                    setGroupName(e.target.value);
                                                }}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="title">
                                            <Form.Control
                                                type="text"
                                                name="submittedBy"
                                                value={submittedBy}
                                                placeholder="Submitted By"
                                                onChange={(e) => {
                                                    setSubmittedBy(e.target.value);
                                                }}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="upload-section">
                                    <Dropzone
                                        onDrop={onDrop}
                                        onDragEnter={() => updateBorder('over')}
                                        onDragLeave={() => updateBorder('leave')}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                                <input {...getInputProps()} />
                                                <p>Drag and drop a file OR click here to select a file</p>
                                                {file && (
                                                    <div>
                                                        <strong>Selected file:</strong> {file.name}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Dropzone>
                                    {previewSrc ? (
                                        isPreviewAvailable ? (
                                            <div className="image-preview">
                                                <img className="preview-image" src={previewSrc} alt="Preview" />
                                            </div>
                                        ) : (
                                            <div className="preview-message">
                                                <p>No preview available for this file</p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="preview-message">
                                            <p>Image preview will be shown here after selection</p>
                                        </div>
                                    )}
                                </div>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

export default AddSubmission;
