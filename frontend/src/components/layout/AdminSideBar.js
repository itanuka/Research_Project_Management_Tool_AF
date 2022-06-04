import React from 'react'

import '../style/adminSideBar.css'

export default function adminSideBar() {


    return (
        <div>

            <div >
                <div class="sidebar-wrapper">
                    <nav id="sidebar">
                        <ul class="list-unstyled components">
                            <li>
                                <a href="/admin-home"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                            </li>

                            <li>
                                <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i
                                    class=" fas fa-users"></i> Users</a>
                                <ul class="collapse list-unstyled" id="productSubmenu">
                                    <li>
                                        <a href="/admin/staff"><i class="fa-solid fa-user"></i> Staff</a>
                                    </li>

                                    <li>
                                       
                                        <a href="/admin/students"><i class="fa-solid fa-user-graduate"></i> Student</a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="/admin/groups"><i class="fa-solid fa-users-rectangle"></i> Students Groups</a>
                            </li>

                            <li>
                                <a href="addtemplate"><i class="fas fa-clipboard-list"></i> Templates</a>
                            </li>

                            <li>
                                <a href="/allocatepanelmembers"><i class="fas fa-clipboard-list"></i> Allocate Panel Members</a>
                            </li>

                            <li>
                                <a href="/addAdmin"><i class="fas fa-plus"></i> Add New Admin</a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    )
}
