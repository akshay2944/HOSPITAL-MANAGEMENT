import React from "react";


const products = Array.from({ length: 51 }, (_, i) => ({

  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Fashion", "Books", "Home"][i % 4],
  price: Math.floor(Math.random() * 90000) + 1000,
  stock: Math.floor(Math.random() * 100),
  rating: +(Math.random() * 2 + 3).toFixed(1),
  brand: `Brand ${i + 1}`,
  image: `https://picsum.photos/300?random=${i + 1}`,
  description: `Description for Product ${i + 1}`
}));

console.log(products);


export default products;