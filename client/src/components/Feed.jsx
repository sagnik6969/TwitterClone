import React from "react";
import "./feed.css";
import Twitbox from "./Tweetbox";
import TweetInputbox from "./TweetInputbox";
import axios from "axios";
function Feed() {
  const [PreparedTwitList, setpreparedTwitList] = React.useState();
  function f() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;

    axios.get("/gettwits").then((res) => {
      const twits = res.data;
      //console.log(res.data);
      const preparedData = twits.map((t, index) => {
        return (
          <Twitbox
            key={index}
            name={t.name}
            text={t.content}
            Image={t.picture}
          />
        );
      });

      setpreparedTwitList(preparedData);
    });
  }

  React.useEffect(f, []);
  // setInterval(f, 10000);

  return (
    <div className="feed">
      <div className="feedHeader">
        <h2>Home</h2>
      </div>
      <TweetInputbox />
      {PreparedTwitList}
    </div>
  );
}

export default Feed;
