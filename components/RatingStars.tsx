interface RatingStarsProps {
  rating: number | string;
  reviewsCount?: number | string;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export default function RatingStars({
  rating,
  reviewsCount,
  size = 'md',
  showScore = true
}: RatingStarsProps) {
  // Convert rating to number (handles both string and number from Supabase)
  const ratingNum = typeof rating === 'string' ? parseFloat(rating) || 0 : rating;
  const reviewsNum = typeof reviewsCount === 'string' ? parseInt(reviewsCount) || 0 : reviewsCount || 0;

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className={`${sizeClasses[size]} text-yellow-500 fill-current`} viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <svg className={`${sizeClasses[size]} text-gray-600 fill-current`} viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <svg className={`${sizeClasses[size]} text-yellow-500 fill-current absolute top-0 left-0`} viewBox="0 0 20 20" style={{ clipPath: 'inset(0 50% 0 0)' }}>
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className={`${sizeClasses[size]} text-gray-600 fill-current`} viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      {showScore && (
        <span className={`${textSizeClasses[size]} font-semibold ${getRatingColor(ratingNum)}`}>
          {ratingNum.toFixed(1)}
        </span>
      )}
      {reviewsNum > 0 && (
        <span className={`${textSizeClasses[size]} text-gray-500`}>
          ({reviewsNum.toLocaleString()})
        </span>
      )}
    </div>
  );
}
