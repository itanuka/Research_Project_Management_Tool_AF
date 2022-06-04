import React, { useState, useEffect, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../../../style/styles.scss'
import { useNavigate } from 'react-router-dom';
import UserSideBar from '../../../layout/UserSideBar'
import Swal from 'sweetalert2';
// import { API_URL } from '../../utils/constants';


function AddTopic(props) {
  let navigate = useNavigate()
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [title, setTitle] = useState('');
  const [groupName, setGroupName] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [groupID, setGroupID] = useState('');
  const [status, setStatus] = useState("Pending");

  // const [state, setState] = useState({
  //   title: '',
  //   description: ''
  // });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  // const handleInputChange = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value
  //   });
  // };

  useEffect(() => {

    try {
      // const jwt = localStorage.getItem("token");
      // const user = jwtDecode(jwt);
      const user = props.user;
      setGroupName(props.user.groupName);
      setSubmittedBy(props.user.userID);
      setGroupID(props.user.groupID)
    } catch (error) {

    }
  }, [props]);

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
      if (title.trim() !== '' && groupName.trim() !== '' && submittedBy.trim() !== '' && status.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('groupName', groupName);
          formData.append('submittedBy', submittedBy);
          formData.append('groupID', groupID);
          formData.append('status', status);

          setErrorMsg('');
          await axios.post('http://localhost:4000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          // props.history.push('/list');
          console.log('works fine to this point')
          Swal.fire({
            title: 'Topic Submit Successfully',
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
                        name="title"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
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

export default AddTopic;
