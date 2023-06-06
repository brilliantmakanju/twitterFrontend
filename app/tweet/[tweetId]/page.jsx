"use client";
import { useParams } from "next/navigation";
import ViewTweet from "../../../components/viewTweet";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { FaSearch, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import NavMobile from "../../../components/base/top/Nav";
import { useRef, useState } from "react";
import Tweets from "../../../components/Tweets";
TimeAgo.addDefaultLocale(en);

const TweetView = () => {
  const param = useParams();
  const tweetId = param.tweetId;
  const myElement = useRef(null);
  const [position, setPosition] = useState(0);

  const [fixed, setFixed] = useState(false);

  const FixedChange = () => {
    const al = myElement.current;
    setPosition(al.scrollTop);
    if (position >= 1) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  return (
    <>
      <main
        onScroll={() => FixedChange()}
        ref={myElement}
        className="overflow-y-scroll h-screen w-full overflow-x-hidden"
      >
        <NavMobile arrow label={"Tweet"} fixed={fixed} />
        <ViewTweet tweetId={tweetId} />
        {/* <Tweets /> */}
      </main>
    </>
  );
};

export default TweetView;
