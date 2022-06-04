import React from 'react'
import '../style/supervisorSideBar.css'

export default function SupervisorSideBar() {
  return (
    <div>
       <div >
                <div class="sidebar-wrapper">
                    <nav id="sidebar">
                        <ul class="list-unstyled components">
                            <li>
                                <a href="/supervisor"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                            </li>

                            <li>
                                
                                <a href=''><i class="fa-solid fa-file"></i> View Topic</a>
                            </li>                          

                        </ul>
                    </nav>
                </div>
            </div>
    </div>
  )
}
