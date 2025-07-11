import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartdata, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }

    setCartData(tempData); // ✅ Don't forget to update state
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <h1 className="text-gray-600 text-2xl font-medium">Your Cart</h1>
      </div>
      <div>
        {cartdata.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
              onChange={(e)=>e.target.value === '' || e.target.value === '0' ? nul : updateQuantity(item._id, item.size, Number(e.target.value))}
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />
              <img onClick={()=>updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className="w-4 mr-4 sm:w-5 cursor-pointer" alt="" />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full text-end"><button onClick={()=>navigate('/placeOrdre')} className="bg-black text-white text-sm my-8 px-8 py-3 rounded-lg">PROCEED TO CHECKOUT</button></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
