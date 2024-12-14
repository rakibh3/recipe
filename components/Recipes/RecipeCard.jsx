import Image from 'next/image';

const RecipeCard = ({ recipe, handleDetailsOpen, handleAddToCart }) => {
  return (
    <>
      <div className="flex flex-col justify-between group space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10">
        <Image
          className="mx-auto rounded-2xl"
          src={recipe?.strMealThumb}
          alt="Web Development"
          loading="lazy"
          width={500}
          height={500}
        />
        <h3 className="text-2xl font-semibold text-gray-800">
          {recipe?.strMeal}
        </h3>
        <p>
          Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
          consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
          animi officiis.
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 mx-3">
          <button
            onClick={() => handleDetailsOpen(recipe?.idMeal)}
            className="bg-yellow-300 text-yellow-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 active:bg-yellow-500 transition duration-200"
          >
            See Details
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 active:bg-green-700 transition duration-200"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
