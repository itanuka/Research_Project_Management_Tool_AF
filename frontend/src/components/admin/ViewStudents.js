import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../layout/AdminSideBar";
import Swal from "sweetalert2";

function ViewStudents() {
  let navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [noData, setNodata] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("")

  const filteredStudents = students.filter((student) => {
    return student.idNumber.toLowerCase().includes(searchKeyword.toLowerCase())
  })


  const deleteStudent = async (id, idNumber) => {
    await axios
      .delete("http://localhost:4000/api/v1/students/delete/" + id)
      .then((res) => {
        console.log(res);
      });

    await axios
      .delete("http://localhost:4000/api/v1/users/deleteByUserID/" + idNumber)
      .then((res) => {
        console.log(res);
      });
    loadStudent();
  };

  const loadStudent = () => {
    axios
      .get("http://localhost:4000/api/v1/students/")
      .then((res) => {
        setStudents(res.data);
        console.log(res);
        if (res.data.length == 0) {
          setNodata(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    function getStudents() {
      axios
        .get("http://localhost:4000/api/v1/students/")
        .then((res) => {
          setStudents(res.data);
          console.log(res);
          if (res.data.length == 0) {
            setNodata(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getStudents();
  }, [students]);

  return (
    <div>


      <div className="row">
        <div className="col-2">
          <AdminSideBar />
        </div>
        <div className="col-10">
          <input className="mt-5" placeholder="Search by StudentID" style={{ width: "10vw", marginLeft: "77%" }}
            onChange={(e) => {
              setSearchKeyword(e.target.value)
            }}
          />
          <table className="table mt-5 container">
            <thead>
              <th> Student ID </th>
              <th> Name </th>
              <th> Degree </th>
              <th> Specilization </th>
              <th>Email</th>
              <th> Update </th>
              <th> Delete </th>
              
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                return (
                  <tr>
                    <td> {student.idNumber} </td>
                    <td> {student.name} </td>
                    <td> {student.degree} </td>
                    <td> {student.specialization} </td>
                    <td>{student.email}</td>
                    <td>
                      <button className="btn btn-warning p-1"
                        onClick={() => {
                          navigate(`update/${student._id}`)
                        }}> UPDATE
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger p-1"
                        onClick={() => {
                          Swal.fire({
                            title: "Warning!",
                            text: "Do you want to delete the user?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#C81E1E",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteStudent(student._id, student.idNumber);
                            } else {
                            }
                          })
                        }}
                      >
                        {" "}
                        DELETE{" "}
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>


        </div>
      </div>


    </div>
  );
}

export default ViewStudents;
