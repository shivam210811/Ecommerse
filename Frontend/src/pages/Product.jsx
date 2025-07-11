import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const [productData, setProductData] = useState(false);

  const fetchProductsData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, [products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Products data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* products image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                  onClick={() => setImage(item)}
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%] ">
            <img src={image} className="w-full h-auto " alt="" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex item-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 ">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => {
                return (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-lg">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original products</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 yext-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            unde libero in veniam corrupti inventore vero, ut voluptatem ex
            tenetur eligendi, at mollitia. Deleniti nihil, ipsum inventore eos
            sit porro! Facere fugiat ab illo cum obcaecati soluta eveniet
            temporibus quis officiis accusantium architecto ullam sapiente vitae
            ut veniam corporis, dolor quaerat rerum voluptas culpa non eos
            deserunt? Saepe, vitae illo?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            unde libero in veniam corrupti inventore vero, ut voluptatem ex
            tenetur eligendi, at mollitia. Deleniti nihil, ipsum inventore eos
            sit porro! Facere fugiat ab illo cum obcaecati soluta eveniet
            temporibus quis officiis accusantium architecto ullam sapiente vitae
            ut veniam corporis, dolor quaerat rerum voluptas culpa non eos
            deserunt? Saepe, vitae illo?
          </p>
        </div>
      </div>
      {/* --------------------related products------------------- */}

              <RelatedProducts category={ productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : (
    <div className="opacity:0"></div>
  );
};

export default Product;
