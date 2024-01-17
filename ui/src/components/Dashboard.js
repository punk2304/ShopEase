import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
