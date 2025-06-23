import ShopLogin from "../components/Shop/ShopLogin";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShopLoginPage = () => {

  const navigate = useNavigate();

  const { isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller===true) {
      navigate(`/dashboard`);
    }
  }, []);

  // console.log(isSeller, seller);

  return (
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage