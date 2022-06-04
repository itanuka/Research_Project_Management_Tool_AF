import React from 'react'
import PanelMemberSideBar from '../../layout/PanelMemberSideBar'

export default function UpdatePanelMemberPassword() {
    return (
        <div>
            <div className='row'>
                <div className='col-2'>
                    <PanelMemberSideBar />
                </div>
                <div className='col-10'>
                    <div className="row" style={{ height: "80px" }}></div>
                    <div class="container body ">
                        <div class="row mt-5 mb-5">
                            <div class="col-md-3"></div>
                            <div class="col-md-6">
                                <div class="card ">
                                    <div class="card-body">
                                        <h2 class="mb-4 text-center">Change Password</h2>

                                        <form >
                                            <div class="form-group ">
                                                <label for="newPassword">New Password</label>
                                                <input type="password"
                                                    class="form-control"
                                                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                                    // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                                    id="newPassword"
                                                    // value={userID}
                                                    name="newPassword"
                                                    // onChange={(e) => {
                                                    //     setUserID(e.target.value);
                                                    // }}
                                                    required
                                                    aria-describedby="userHelp" />

                                            </div>
                                            <div class="form-group">
                                                <label for="confirmPassword">Confirm Password</label>
                                                <input type="password"
                                                    class="form-control"
                                                    required
                                                    // value={password}
                                                    name="confirmPassword"
                                                // onChange={(e) => {
                                                //     setPassword(e.target.value);
                                                // }}
                                                />
                                            </div>

                                            <button type="submit" class="btn btn-primary custom-btn-signIn" >UPDATE PASSWORD</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
