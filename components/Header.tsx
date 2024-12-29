import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="w-screen h-16 text-center  bg-gray-800 text-white flex pl-16 items-center">
      <Image
        src={"/header.png"}
        height={100}
        width={300}
        alt="すごい文字数カウント"
      />
    </header>
  );
};

export default Header;
