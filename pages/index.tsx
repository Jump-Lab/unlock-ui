import React, { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import Home from "./home";

export default function HomePage() {
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
      <Home />
    </>
  );
}
