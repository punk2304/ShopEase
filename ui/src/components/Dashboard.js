import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <div>
        this is dashboard
      </div>
      <div>
        <Sidebar/>
        hhhhhhh
      </div>
      ouside div
      <div>
        <Outlet/>
        heloooo
      </div>
    </div>
  )
}

export default Dashboard
