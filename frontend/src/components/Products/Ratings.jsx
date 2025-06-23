import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Ratings = ({ rating  }) => {
  return (
    <div className="flex w-full ml-2 pt-1">
      {[1, 2, 3, 4, 5].map((i) =>
        rating >= i ? (
          <AiFillStar
            key={i}
            className="mr-1"
            color="rgb(246,186,0)"
            size={25}
          />
        ) : (
          <AiOutlineStar
            key={i}
            className="mr-1"
            color="rgb(246,186,0)"
            size={25}
          />
        )
      )}
    </div>
  );
};

export default Ratings;