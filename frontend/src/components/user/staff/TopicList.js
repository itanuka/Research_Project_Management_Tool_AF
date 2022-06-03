import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
// import { API_URL } from '../../utils/constants';
import PanelMemberSideBar from "../../layout/PanelMemberSideBar";
import Swal from "sweetalert2";

const TopicList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [searchKeyword, setSearchKeyword] = useState("")

  const filterTopic = filesList.filter((item) => {
    return item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  })

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/topics/');
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
      const result = await axios.get(`http://localhost:4000/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];

      Swal.fire("Topic file is Downloaded!!", "Click ok to Continue", "success");
      setErrorMsg('');

      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        //setErrorMsg('Error while downloading file. Try again later');
        Swal.fire("Error while downloading file. Try again later!!", "Click ok to Continue", "success");
      }
    }
  };

  const acceptTopic = async (id) => {
    try {
      const requestBody = {
        status: "Accepted"
      };

      await axios.patch(`http://localhost:4000/changeStatus/${id}`, requestBody);
      alert("Topic status is changed to Accepted");
      window.location = "/list"

    } catch (error) {
      alert(error);
    }
  }

  const rejectTopic = async (id) => {
    try {
      const requestBody = {
        status: "Rejected"
      };

      await axios.patch(`http://localhost:4000/changeStatus/${id}`, requestBody);
      alert("Topic status is changed to Rejected");
      window.location = "/list"

    } catch (error) {
      alert(error);
    }
  }



  return (

    <div>

      <div className='row'>
        <div className='col-2'>
          {/*  panel member sidebar */}
          <PanelMemberSideBar />
        </div>
        <div className='col-10'>

          <div className="files-container">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <input className='mt-5' placeholder="Search by GroupName" style={{ marginLeft: "79%", width: "12vw" }} onChange={(e) => {
              setSearchKeyword(e.target.value)
            }} />


            <table className='table mt-5 container'>
              <thead>
                <th>Title</th>
                <th>Group Name</th>
                <th>Submitted By</th>
                <th>Status</th>
                <th>Download File</th>
                <th>Accept</th>
                <th>Reject</th>
              </thead>

              <tbody>
                {filterTopic.map((item) => {
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td>{item.groupName}</td>
                      <td>{item.submittedBy}</td>
                      <td>{item.status}</td>


                      <td> <a href="#/" style={{ textDecoration: "none" }} onClick={() =>
                        downloadFile(item._id, item.file_path, item.file_mimetype)
                      }
                      >
                        Download
                      </a></td>
                      <td>

                        <button onClick={() =>
                          acceptTopic(item._id)
                        } className='btn btn-success p-1'>Accept</button>
                      </td>
                      <td>
                        <button onClick={() =>
                          rejectTopic(item._id)
                        } className='btn btn-danger p-1'>Reject</button>
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

export default TopicList;
