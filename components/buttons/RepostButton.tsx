"use client";
import Image from "next/image";
import React from "react";
import Clipboard from "react-clipboard.js";

const RepostButton = ({ link }: { link: string }) => {
  let host: any;

  if (typeof window !== "undefined") {
    host = window.location.host;
  }

  const alertSuccess = () => {
    console.log(host);
    alert(
      "Post's link has been copied! Now, you can paste and share with other..."
    );
  };

  return (
    <Clipboard data-clipboard-text={`${host}${link}`} onSuccess={alertSuccess}>
      <Image
        className="cursor-pointer ogject-contain"
        src="/assets/repost.svg"
        alt="repost"
        width={24}
        height={24}
      />
    </Clipboard>
  );
};

export default RepostButton;
