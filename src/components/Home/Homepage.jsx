import React from "react";
import Herosection from "./Herosection";

import first_section from "../../assets/first_section.png";
import macbook from "../../assets/macbook.png";
import Featuredproducts from "./Featuredproducts";

const Homepage = () => {
  return (
    <div>
      <Herosection
        title="Discover Cutting-Edge Electronics"
        subtitle="Explore a world of innovation with our collection of smartwatches, gaming consoles, phones, and laptops. Stay connected, entertained!"
        link="/products"
        image={first_section}
      />
      <Featuredproducts />
      <Herosection
        title="Laptop Haven: Unleash Your Potential"
        subtitle="Dive into our Laptop Haven, where power meets portability. Explore a range of cutting-edge laptops designed to elevate your productivity, creativity, and entertainment experience. From sleek ultrabooks to powerhouse gaming rigs, find the perfect companion for your digital journey. Upgrade to excellence with our premium selection of laptops."
        link="/products?category=Laptops"
        image={macbook}
      />
    </div>
  );
};

export default Homepage;
