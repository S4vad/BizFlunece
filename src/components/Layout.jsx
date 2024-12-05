import React from 'react'
import { Link } from 'react-router-dom'
const Layout = ({children}) => {
  return (
    <div>
      <div>
        {children}
      </div>
      <div className='flex'>
      <Link to='/'>Home</Link>
      <Link to='/about'>AboutUs</Link>
      <Link to='/contact'>Contact</Link>
      <Link to='/ourWorks'>OurWorks</Link>
    </div>
    </div>

  )
}

export default Layout