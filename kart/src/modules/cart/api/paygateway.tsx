import { navigate } from "@navigation/NavigationUtil";
import { BASE_URL } from "@store/config";
import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";

export const createTransaction = async (amount: number, userId: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/order/transaction`, {
      userId,
      amount: amount * 100,
    });

    console.log("✅ Transaction Created:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating transaction", error);
    return null;
  }
};

export const createOrder = async (
  key: string,
  amount: number,
  order_id: string,
  cart: any,
  userId: string,
  address: string
) => {
  try {
    let options = {
      description: "Ecommerce Shopping",
      image: "https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg",
      currency: "INR",
      key: key,
      amount: amount,
      name: "Kart",
      order_id: order_id,
      theme: {
        color: "#53a20e",
      },
    };

    console.log("✅ Opening Razorpay with Options:", options);

    RazorpayCheckout.open(options)
      .then(async (data) => {
        console.log("✅ Razorpay Payment Success:", data);

        if (!data.razorpay_payment_id || !data.razorpay_signature) {
          console.error("❌ Razorpay Signature Missing!", data);
          return;
        }

        const today = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(today.getDate() + 7);

        console.log("📦 Creating Order with Data:", {
          razorpay_order_id: order_id,
          razorpay_payment_id: data?.razorpay_payment_id,
          razorpay_signature: data?.razorpay_signature,
          cartItems: cart,
          userId: userId,
          address: address,
          deliveryDate: sevenDaysFromNow,
        });

        const res = await axios.post(`${BASE_URL}/order`, {
          razorpay_order_id: order_id,
          razorpay_payment_id: data?.razorpay_payment_id,
          razorpay_signature: data?.razorpay_signature,
          cartItems: cart,
          userId: userId,
          address: address,
          deliveryDate: sevenDaysFromNow,
        });

        console.log("✅ Order Created Successfully:", res.data);

        navigate("PaymentSuccess", {
          price: amount / 100,
          address: address,
        });
      })
      .catch((error: any) => {
        console.error("❌ Error during Razorpay checkout", error);
        return { type: "error", message: "Error" };
      });
  } catch (error) {
    console.error("❌ Error creating order", error);
    return { type: "error", message: "Error" };
  }
};