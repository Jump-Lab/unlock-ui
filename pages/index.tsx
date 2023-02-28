import React, { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import Home_2 from "./home/home_2";

export default function Home() {
  const { scrollRef } = useContext(UserContext);

  useEffect(() => {
    if (window && scrollRef.current) {
      window.scrollTo(0, scrollRef.current.scrollPos);
      const handleScrollPos = () => {
        scrollRef.current.scrollPos = window.scrollY;
      };
      window.addEventListener("scroll", handleScrollPos);
      return () => {
        window.removeEventListener("scroll", handleScrollPos);
      };
    }
  });

  return (
    <>
      <Home_2 />
    </>
  );
}