
import axios from "axios";
import { useEffect, useState } from "react";

import UserSideBar from '../../layout/UserSideBar'

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function CreateGroup() {
  const [loading, setLoading] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [firstMemberID, setFirstMemberID] = useState("");
  const [secondMemberID, setSecondMemberID] = useState("");
  const [thirdMemberID, setThirdMemberID] = useState("");
  const [fourthMemberID, setFourthMemberID] = useState("");

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newGroup = {
      groupName,
      firstMemberID,
      secondMemberID,
      thirdMemberID,
      fourthMemberID,
    };


    axios
      .post("http://localhost:4000/api/v1/groups/createGroup", newGroup)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });



    // Swal.fire("Registration Succesfull!", "Click ok to Continue", "success");
    Swal.fire({
      title: 'Group Create Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    }).then((value) =>{
      Swal.fire(( window.location = "/"));
    });

    localStorage.clear();
   

    setGroupName("");
    setFirstMemberID("");
    setSecondMemberID("");
    setThirdMemberID("");
    setFourthMemberID("");

  };

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <UserSideBar />
        </div>
        <div className="col-md-10">
          <div className="row" style={{ height: "60px" }}></div>
          <div class="container">

            <div class="row mt-5 mb-5">
              <div class="col-md-2"></div>

              <div class="col-md-8">
                <div class="card ">
                  <div class="card-body">
                    <h2 class="mb-4 text-center">Create a Group</h2>

                    <form onSubmit={handleSubmit} id="form">

                      <div class="form-row">
                        <div class="col">
                          <label for="inputGroupName">Group Name</label>
                          <input type="text"
                            class="form-control"
                            value={groupName}
                            required
                            onChange={(e) => {
                              setGroupName(e.target.value);
                            }}
                          />
                        </div>

                      </div>


                      <div class="form-row">
                        <div class="col">
                          <label for="inputFirstMemberID">Member 1 ID</label>
                          <input type="text"
                            class="form-control"
                            value={firstMemberID}
                            required
                            onChange={(e) => {
                              setFirstMemberID(e.target.value);
                            }}
                          />
                        </div>

                        <div class="col">
                          <label for="inputSecondMemberID">Member 2 ID</label>
                          <input type="text"
                            class="form-control"
                            value={secondMemberID}
                            required
                            onChange={(e) => {
                              setSecondMemberID(e.target.value);
                            }}
                          />
                        </div>

                      </div>

                      <div class="form-row">
                        <div class="col">
                          <label for="inputThirdMemberID">Member 3 ID</label>
                          <input type="text"
                            class="form-control"
                            value={thirdMemberID}
                            required
                            onChange={(e) => {
                              setThirdMemberID(e.target.value);
                            }}
                          />
                        </div>

                        <div class="col">
                          <label for="inputFourthMemberID">Member 4 ID</label>
                          <input type="text"
                            class="form-control"
                            value={fourthMemberID}
                            required
                            onChange={(e) => {
                              setFourthMemberID(e.target.value);
                            }}
                          />
                        </div>

                      </div>


                      <button type="submit" class="btn btn-primary mt-4"
                        style={{ width: '100%', height: '40px' }}
                        disabled={loading ? true : false}
                      >Create Group</button>
                    </form>

                  </div>
                </div>


              </div>
              <div class="col-md-2"></div>

            </div>
          </div>


        </div>
      </div>







    </div>
  );
}

export default CreateGroup;
