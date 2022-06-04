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
                                <a href='/list'><i class="fa-solid fa-file"></i> View Topic</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
