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
                           
                        </ul>
                    </nav>
                </div>
            </div>

        </div>
    )
}
