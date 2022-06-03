import React, { useState, useEffect, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../../../style/styles.scss'
import { useNavigate } from 'react-router-dom';
import UserSideBar from '../../../layout/UserSideBar'
import AddTopic from './AddTopic';
import ViewTopic from './ViewTopic';
// import { API_URL } from '../../utils/constants';

function Topic(props) {
    const [user, setUser] = useState({});
    const [topic, setTopic] = useState({});

    useEffect(() => {

        try {
            const jwt = localStorage.getItem("token");
            setUser(jwtDecode(jwt));
        } catch (error) {

        }
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/topics/getTopicUsingGroupID/" + user.groupID)
            .then((res) => {
                setTopic(res.data);
            })

            .catch((err) => {
                console.log(err);
            });
    }, [user, topic]);



    console.log("Component is rendered")

    if (!topic) {
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

                                <AddTopic user={user} />
                                {/* {topic ? <ViewTopic topic={topic} /> : <AddTopic user={user} />} */}
                                {/* (topic && <ViewTopic topic={topic} />} */}



                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }


    if (topic.status == "Rejected") {
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
                                <h1>Your topic is rejected. Submit a new topic</h1>
                                <ViewTopic topic={topic} />

                                <h1>Submit a new topic</h1>
                                <AddTopic user={user} />
                                {/* {topic ? <ViewTopic topic={topic} /> : <AddTopic user={user} />} */}
                                {/* (topic && <ViewTopic topic={topic} />} */}



                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    else if (topic) {
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
                                {/* {topic ? <ViewTopic topic={topic} /> : <AddTopic user={user} />} */}
                                {/* (topic && <ViewTopic topic={topic} />} */}
                                <ViewTopic topic={topic} />

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    else {
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
                                {/* {topic ? <ViewTopic topic={topic} /> : <AddTopic user={user} />} */}
                                {/* (topic && <ViewTopic topic={topic} />} */}
                                <AddTopic user={user} />
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }


};

export default Topic;
