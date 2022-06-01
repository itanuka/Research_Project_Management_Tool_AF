
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../layout/AdminSideBar";

import Swal from "sweetalert2";


function ViewStaff() {
  let navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [noData, setNodata] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("")

  const filteredStaffMembers = staff.filter((staffMember) => {
    return staffMember.idNumber.toLowerCase().includes(searchKeyword.toLowerCase())
  })


  const deletestaff = async (id, idNumber) => {
    await axios
      .delete("http://localhost:4000/api/v1/staff/delete/" + id)
      .then((res) => {
        console.log(res);
      });

    await axios
      .delete("http://localhost:4000/api/v1/users/deleteByUserID/" + idNumber)
      .then((res) => {
        console.log(res);
      });
    loadStaffData();
  };

  const loadStaffData = () => {
    axios
      .get("http://localhost:4000/api/v1/staff/")
      .then((res) => {
        setStaff(res.data);
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
    function getStaff() {
      axios
        .get("http://localhost:4000/api/v1/staff/")
        .then((res) => {
          setStaff(res.data);
          console.log(res);
          if (res.data.length == 0) {
            setNodata(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getStaff();
  }, [staff]);
  return (
    <div>



      <div className="row">
        <div className="col-2">
          <AdminSideBar />
        </div>
        <div className="col-10">
          <input className="mt-5" placeholder="Search By Staff ID" style={{ width: "10vw", marginLeft: "82%" }}
            onChange={(e) => {
              setSearchKeyword(e.target.value)
            }}
          />
          <table className="table container mt-5">
            <thead>
              <th> Name </th>
              <th> Staff ID </th>
              <th> Department </th>
              <th> Faculty </th>
              <th> Research_Interest </th>
              <th> Staff Type </th>
              <th>Email</th>
              <th> Update </th>
              <th> Delete </th>
            </thead>
            <tbody>
              {filteredStaffMembers.map((member) => {
                return (
                  <tr key={member._id}>
                    <td> {member.name} </td>
                    <td> {member.idNumber} </td>
                    <td> {member.department} </td>
                    <td> {member.faculty} </td>
                    <td> {member.researchInterest} </td>
                    <td> {member.type} </td>
                    <td>{member.email}</td>
                    <td>  <button className="btn btn-warning"
                      onClick={() => {
                        navigate(`update/${member._id}`)
                      }}
                    >
                      UPDATE
                    </button> </td>
                    <td> <button className="btn btn-danger"
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
                            deletestaff(member._id, member.idNumber);
                          } else {
                          }
                        });
                      }}
                    >
                      DELETE
                    </button> </td>
                  </tr>
                )
              })}
            </tbody>
          </table>


        </div>
      </div>




    </div>
  );
}

export default ViewStaff;
