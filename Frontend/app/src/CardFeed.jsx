import React from 'react'

function CardFeed({user}) {
  // console.log("user",user);

  const{firstName,lastName,photoUrl,age,gender,about}=user;
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-6  ">
      
      <div className="card w-96 border-black rounded-md bg-base-100 shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 ">
        
        {/* Top Half - Image */}
        <div className="h-58 flex justify-center items-center">
          <img
            src={photoUrl}
            alt="Adidas Ultraboost"
            className=" w-full object-cover"
          />
        </div>

        {/* Bottom Half - Content */}
        <div className="card-body text-center text-white ">
          <h2 className="card-title justify-center">{firstName+" "+lastName }</h2>
          <h2 className="card-title justify-center">{"Age-"+age }</h2>
          
          <p className="text-sm ">
            {about}
          </p>

          <div className="card-actions justify-center mt-4 space-x-6">
            <button className="btn px-3 h-8 w-30 border-black rounded-md btn-primary bg-blue-600">Interested</button>
             <button className="btn h-8 w-30 px-4 border-black rounded-md btn-primary bg-red-600">Ignored</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default CardFeed



