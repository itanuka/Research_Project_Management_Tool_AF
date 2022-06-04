import React from 'react'
import '../style/userSideBar.css'

export default function UserSideBar() {
    return (
        <div>
            <div >
                <div class="sidebar-wrapper">
                    <nav id="sidebar">
                        <ul class="list-unstyled components">
                            <li>
                                <a href="/student"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                            </li>

                            <li>
                                
                                <a href='/student/group/topic'><i class="fa-solid fa-file-circle-plus"></i>Topic Submition</a>
                            </li>


                            <li>
                                {/* <a href="#"><i class="fas fa-clipboard-list"></i> Templates</a> */}
                                <a href='/allocatepanelmemberslist'><i class="fa-solid fa-file-circle-plus"></i>Panel Allocation</a>
                            </li>

                            {/* <li>
                                <a href="/addAdmin"><i class="fas fa-plus"></i> Add New Admin</a>
                            </li> */}

                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    )
}
