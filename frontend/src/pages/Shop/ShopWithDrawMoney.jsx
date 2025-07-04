import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import WithdrawMoney from "../../components/Shop/WithdrawMoney.jsx";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import Footer from '../../components/Layout/Footer';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
    <Footer/>
  </div>
  )
}

export default ShopWithDrawMoneyPage