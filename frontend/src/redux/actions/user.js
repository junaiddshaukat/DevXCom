import axios from "axios";
import { server } from "../../server";

//loaduser

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/user/get-user`, { withCredentials: true });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
}

//load seller 

export const loadSeller = () => async (dispatch) => {
  try {
    // console.log("🔄 Dispatching LoadSellerRequest...");
    dispatch({ type: "LoadSellerRequest" });

    const { data } = await axios.get(`${server}/shop/getSeller`, { withCredentials: true });

    // console.log("✅ Seller data received:", data);
    // console.log("🚀 Dispatching LoadSellerSuccess with payload:", data.seller);

    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    // console.log("❌ loadSeller failed:", error.response?.data?.message || error.message);
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || "Failed to load seller",
    });
  }
}