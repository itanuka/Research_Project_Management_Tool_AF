import React from 'react'

import '../style/panelMemberSideBar.css'
export default function PanelMemberSideBar() {
  return (
    <div>
        <div >
                <div class="sidebar-wrapper">
                    <nav id="sidebar">
                        <ul class="list-unstyled components">
                            <li>
                                <a href="/panelMember"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                            </li>

                            <li>
                                <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"><i
                                    class=" fas fa-users"></i> Users</a>
                                <ul class="collapse list-unstyled" id="productSubmenu">
                                    <li>
                                        <a href=""><i class="fa-solid fa-user"></i> Staff</a>
                                    </li>

                                    <li>
                                        {/* <a href="#"><i class="fas fa-plus"></i> Create</a> */}
                                        <a href=""><i class="fa-solid fa-user-graduate"></i> Student</a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                {/* <a href="#"><i class="fas fa-clipboard-list"></i> Templates</a> */}
                                <a href='/list'><i class="fa-solid fa-file"></i> View Topic</a>
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
