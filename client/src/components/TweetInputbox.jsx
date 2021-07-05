import React from "react";
//import { Avatar } from '@material-ui/core'
import image from "./AshisKrJana.jpg";

import { Button } from "@material-ui/core";
import PhotoIcon from "@material-ui/icons/Photo";
import PollIcon from "@material-ui/icons/Poll";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ScheduleIcon from "@material-ui/icons/Schedule";

import "./tweetinputbox.css";
import axios from "axios";

function TweetInputbox() {
  var [text, setText] = React.useState("");

  function handelSubmit() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
    axios
      .post("/posttwit", { content: text })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="tweetinputbox">
      <div className="outerContainer">
        <img alt="Profile" src={image} className="avater" />
        <input
          type="text"
          placeholder="What's Happening?"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </div>
      <div className="buttonContainer">
        <PhotoIcon className="Tweetboxicons" />
        <PollIcon className="Tweetboxicons" />
        <EmojiEmotionsIcon className="Tweetboxicons" />
        <ScheduleIcon className="Tweetboxicons" />
        <Button
          className="Button"
          onClick={() => {
            console.log(text);
            handelSubmit();
            setText("");
          }}
        >
          Tweet
        </Button>
      </div>
    </div>
  );
}

export default TweetInputbox;
