import React from "react";
import Hero_2 from "../../components/hero/hero_2";
import {
  Top_collection,
  Auctions_categories,
  NewseLatter,
  Feature_collections,
  Partners,
} from "../../components/component";
import Meta from "../../components/Meta";
import Information from "components/home/Information";
import Newsfeed from "components/home/Newsfeed";

const Home_2 = () => {
  return (
    <>
      <Meta title="Home 2" />
      <div className="container pt-24 flex gap-x-8">
        <Information />
        <Newsfeed />
      </div>
    </>
  );
};

export default Home_2;
