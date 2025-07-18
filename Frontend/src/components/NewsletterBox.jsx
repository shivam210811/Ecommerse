import React from "react";

const NewsletterBox = () => {
    const onSubmitHandler= (event)=>{
        event.preventDefault();
    }


  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-500">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eaque
        saepe, qui omnis molestiae, commodi aliquid minus, at numquam quia cum
        dolorum nemo debitis rerum voluptatum quibusdam. Quibusdam, voluptate
        provident.
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input className="w-full flex-1 outline-none" type="email" placeholder="Enter Your Email" required/>
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 rounded-md">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
