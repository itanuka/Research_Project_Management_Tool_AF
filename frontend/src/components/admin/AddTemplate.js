import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../style/styles.scss'
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../layout/AdminSideBar'
import Swal from "sweetalert2";
// import { API_URL } from '../../utils/constants';

function AddTemplate(props) {
  let navigate = useNavigate()
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    templateName: '',
    description: '',
    deadline: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

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
      const { templateName, description, deadline } = state;
      if (templateName.trim() !== '' && description.trim() !== '' && deadline.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('templateName', templateName);
          formData.append('description', description);
          formData.append('deadline', deadline);

          setErrorMsg('');
          await axios.post('http://localhost:4000/upload/template', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          Swal.fire("Template Added..!!", "Click ok to Continue", "success");
          // props.history.push('/list');
          console.log('works fine to this point')
          navigate('/admin-home')
        } else {
          //setErrorMsg('Please select a file to add.');
          Swal.fire({
            title: "Please select a file to add!!",
            text: "Please put a file.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        //setErrorMsg('Please enter all the field values.');
        Swal.fire({
          title: "Please enter all the field values!!",
          text: "Please enter the relevent details.",
          icon: "error",
          confirmButtonText: "OK",
        });
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
          <AdminSideBar/>
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
            <label>Template Name</label>
              <Form.Control
                type="text"
                name="templateName"
                value={state.templateName || ''}
                placeholder="template name"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
            <label>Description</label>
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
            <label>Deadline</label>
              <Form.Control
                type="date"
                name="deadline"
                value={state.deadline || ''}
                placeholder="Topic Deadline"
                onChange={handleInputChange}
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

export default AddTemplate;
