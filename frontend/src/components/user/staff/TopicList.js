import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
// import { API_URL } from '../../utils/constants';

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
        const { data } = await axios.get('http://localhost:4000/getAllFiles');
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
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  return (

    <div>

      <div className='row'>
        <div className='col-2'>
          {/*  panel member sidebar */}
        </div>
        <div className='col-10'>

          <div className="files-container">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <input className='mt-5' placeholder="Search by GroupName" style={{ marginLeft: "79%", width: "12vw" }} onChange={(e) => {
              setSearchKeyword(e.target.value)
            }} />


            <table className='table mt-5 container'>
              <thead>
                <th>Group Name</th>
                <th>Topic Title</th>
                <th>Submitted By</th>
                <th>Download File</th>
                <th>Status</th>
                <th>Accept</th>
                <th>Reject</th>
              </thead>

              <tbody>
                {filterTopic.map((item) => {
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td></td>

                      <td> <a href="#/" style={{ textDecoration: "none" }} onClick={() =>
                        downloadFile(item._id, item.file_path, item.file_mimetype)
                      }
                      >
                        Download
                      </a></td>
                      <td></td>
                      <td>

                        <button className='btn btn-success p-1'>Accept</button>
                      </td>
                      <td>
                        <button className='btn btn-danger p-1'>Reject</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* <table className="files-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Topic Title</th>
            <th>Download File</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a href="#/" onClick={() =>
                      downloadFile(_id, file_path, file_mimetype)
                    }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
          </div>

        </div>
      </div>










    </div>

  );
};

export default TopicList;