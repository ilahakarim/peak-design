import React from 'react'
import Header from '../inc/Header'
import Footer from '../inc/Footer'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
