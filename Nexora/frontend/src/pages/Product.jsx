import React, { useEffect, useState } from "react";
import axios from "axios";
const Product = () => {
  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        console.log(res.data.products);

        setData(res.data.products);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // for filter the data based on the details
  const filterData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.price.toString().includes(search)
  );

  return (
    <>
      <div className="p-4 bg-white">
        {/* <h1 className="text-red-500 text-2xl">I am Product</h1> */}

        {/* Searching Items */}

        <input
          type="text"
          placeholder="Search your items here... "
          className="border px-2  w-full max-w-md block m-auto items-center justify-center outline-none py-2 rounded-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div
          className="grid   grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                p-6 gap-5
                products-container
                "
        >
          {filterData.map((product) => {
            let { id, title, description, category, price, images } = product;
            return (
              <div
                className="
                
                product-card
                border-2 gap-2 p-2 flex flex-col rounded-sm transition hover:shadow-2xl border-indigo-50 "
                key={id}
              >
                <p className="text-sm">ID:{id}</p>
                <p className="font-semibold">
                  Title: <span className="text-red-500">{title}</span>
                </p>

                <p className="text-zinc-500">
                  Category: <span className="text-zinc-700">{category}</span>
                </p>
                <img
                  src={product.thumbnail}
                  loading="lazy"
                  alt={title}
                  className="h-40 object-contain w-full"
                />
                <p>
                  Price: <span className="text-red-500 text-xl">{price}$</span>
                </p>
                <p className="text-sm text-zinc-600">
                  Description: {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
