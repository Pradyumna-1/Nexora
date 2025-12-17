import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-10 text-center">
        Welcome to Home Page
      </h1>
      <Link
        to="/product"
        className="text-md px-4  py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Product
      </Link>
    </div>
  );
};

export default Home;
