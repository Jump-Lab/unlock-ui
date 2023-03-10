import React from "react";

import Meta from "components/Meta";
import Information from "components/home/Information";
import Newsfeed from "components/home/Newsfeed";

const Home_2 = () => {
  return (
    <>
      <Meta title="Home 2" />
      <div className="container pt-32 flex gap-x-8">
        <Information />
        <Newsfeed />
      </div>
    </>
  );
};

export default Home_2;
