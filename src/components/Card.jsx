import React from "react";

const Card = ({ image, title, onClick }) => {
  // If no title, return nothing
  if (!title) return null;

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm w-full cursor-pointer 
                 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Card Image (Only Show If Available) */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
        />
      )}

      {/* Title (Centered) */}
      <div className="p-6 flex justify-center items-center">
        <h2 className="text-lg font-bold text-blue-700 text-center transition duration-300 hover:text-blue-900">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Card;
