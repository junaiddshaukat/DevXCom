import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx"
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx"
//  import DashboardHero from "../../components/Shop/DashboardHero.jsx";

// import { getAllEventsShop } from "../../redux/actions/event.js";
// import { getAllProductsShop } from "../../redux/actions/product.js";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
const ShopDashboardPage = () => {
 

//   const { seller } = useSelector((state) => state.seller);
//   const dispatch=useDispatch()
// useEffect(() => {
//     if(seller)
//     {
//       dispatch(getAllProductsShop(seller._id));
//       dispatch(getAllEventsShop(seller._id));
    

//     }
      
//     }, [dispatch, seller]);
 
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[330px] ">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardPage