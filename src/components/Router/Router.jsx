import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from '../Layout/Layout'
import CollectionPage from '../../pages/CollectionPage'
import Home from '../../pages/Home'




function Router() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='collections/:category' element={<CollectionPage/>}/>
      
            </Route>
        </Routes>
    </>
  )
}

export default Router
