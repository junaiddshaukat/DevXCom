import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero'
import Categories from '../components/Route/Catagories/Catagories'
import BestDeals from '../components/Route/BestDeals/BestDeals'
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct'
import Events from '../components/Events/Events'
import Sponsored from '../components/Route/Sponsered'
import Footer from '../components/Layout/Footer'
const HomePage = () => {
  return (
    <div>
     <Header/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <FeaturedProduct/>
      <Events/>
      <Sponsored/>
      <Footer/>
    </div>
  )
}

export default HomePage