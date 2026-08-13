import React from 'react'
import BestSellers from '../components/inc/BestSellers'
import HeroSection from '../components/inc/HeroSection'
import ExploreProducts from '../components/inc/ExploreProducts'
import CityLineSection from '../components/inc/CityLineSection'
import NewArrivals from '../components/inc/NewArrivals'
import RadicalProducts from '../components/inc/RadicalProducts'
import CompanyPromoSections from '../components/inc/CompanyPromoSections'

function Home() {
  return (
    <>
      <HeroSection/>
      <BestSellers/>
      <ExploreProducts/>
      <CityLineSection/>
      <NewArrivals/>
      <RadicalProducts/>
      <CompanyPromoSections/>
      
    </>
  )
}

export default Home
