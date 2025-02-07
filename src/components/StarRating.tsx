import { useState } from "react";
import { Star } from "lucide-react";

export const StarRating = ({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
          className="p-1"
        >
          <Star
            size={24}
            className={
              star <= (hoverRating || rating)
                ? "fill-yellow-400 stroke-yellow-400"
                : "stroke-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
};
