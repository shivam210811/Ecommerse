import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const List = ({token}) => {
  const [list, setList]=useState([])
  const fetchList = async ()=>{
      try {
        const responce = await axios.get(backendUrl + '/api/product/list')
        // setList(responce.data.products)
        if(responce.data.success){
        setList(responce.data.products)
        
        }else{
          toast.error(responce.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
  }

  const removeProduct = async (id)=>{
    try {
      const responce = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}} )
      if(responce.data.success){
        toast.success("Product removed successfully")
        await fetchList();
      }else{
        toast.error(responce)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  } 

  useEffect(()=>{
    fetchList();
  },[])


  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* list table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b className='text-center'>Action</b>
        </div>
        {/* -------product list--------- */}
        {
          list.map((item, index)=>{
            return(
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <img className='w-12' src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              </div>
            )
          }
          )
        }
      </div>
    </>
  );
}

export default List;
