import React from "react";
import "./widgetbar.css";
import Widget from "./Widget";
import Searchbox from "./Searchbox";
import ReactLoading from "react-loading";
import axios from "axios";

function Widgetbar() {
  const [Preparednews, SetPreparednews] = React.useState(
    <ReactLoading className="reactloading" type={"bubbles"} color={"#1da1f2"} />
  );
  function f() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
    axios.get("/news").then((resp) => {
      var news = resp.data;

      var newsArticles = news.articles;
      const Preparednewsarticles = newsArticles.map((inp, index) => {
        return (
          <Widget
            key={index}
            title={inp.title}
            description={inp.description}
            url={inp.url}
            background={inp.urlToImage}
          />
        );
      });
      SetPreparednews(Preparednewsarticles);
    });
  }

  React.useEffect(f, []);

  return (
    <div className="widgetbar">
      <Searchbox />
      {Preparednews}
    </div>
  );
}

export default Widgetbar;
