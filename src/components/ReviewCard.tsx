interface cardPropType {
  title: string;
  description: string;
  rating?: number;
  publishedAt?: string;
  documentId?: string;
  Active?: boolean;
}

const ReviewCard: React.FC<cardPropType> = (props) => {
  const { title, description, rating, publishedAt, Active } = props;

  return (
    <>
      <div>
        <div className="flex cursor-default flex-col justify-between max-w-sm h-[220px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex justify-between gap-6 mb-5">
            <div className="flex text-center items-center align-middle justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </div>
            {rating && (
              <div
                className={`flex justify-center h-10 w-10 bg-gray-100 font-bold border items-center text-center align-middle rounded-md ${
                  rating > 7
                    ? "text-softGreen"
                    : rating < 6
                    ? "text-red-700"
                    : "text-yellow-400"
                }`}
              >
                {rating}
              </div>
            )}
          </div>

          <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis line-clamp-3">
            {description}
          </p>

          <div className="flex items-center text-center justify-between gap-7 mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Published at: {publishedAt}
            </span>
            <>
              <div className="flex cursor-pointer justify-center items-center h-6 w-6 border rounded-full">
                <button
                  className={`h-4 w-4 rounded-full text-sm ${
                    Active ? "bg-lime-500" : "bg-red-600"
                  }`}
                ></button>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
