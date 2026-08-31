import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from '../Layout/Layout'
import CollectionPage from '../../pages/CollectionPage'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import ProductPage from '../../pages/ProductPage'
import Wishlist from '../../pages/Wishlist'
import CityLine from '../../pages/CityLine'
import Mission from '../../pages/Mission'
import ImpactReport from '../../pages/ImpactReport'
import Films from '../../pages/Films'
import Store from '../../pages/Store'
import InfoPage from '../../pages/InfoPage'
import ScrollToTop from './ScrollToTop'




function Router() {
  return (
    <>
        <ScrollToTop/>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='collections/:slug' element={<CollectionPage/>}/>
                <Route path='products/:id' element={<ProductPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/wishlist' element={<Wishlist/>}/>
                <Route path='/city-line' element={<CityLine/>}/>
                <Route path='/mission' element={<Mission/>}/>
                <Route path='/impact-report' element={<ImpactReport/>}/>
                <Route path='/films' element={<Films/>}/>
                <Route path='store/:slug' element={<Store/>}/>
                <Route path='info/:slug' element={<InfoPage/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default Router