import React, { useState, useEffect } from "react";
import "./ad.css";

const adList = [
  {
    id: 0,
    picture: "https://www.framer.com/static/images/social/framer.png",
    title: "Framer",
    description:
      "A free prototyping tool for teams. Bring every design to life in Framer",
    link: "https://www.framer.com/",
  },
  {
    id: 1,
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvk27FJ7keQnZLcglO7LP8Bo8HdNikQMeSNQ&usqp=CAU",
    title: "MongoDB",
    description:
      "MongoDB is a cross-platform document-oriented database program.",
    link: "https://www.mongodb.com/",
  },
  {
    id: 2,
    picture:
      "https://entrackr.com/wp-content/uploads/2017/12/myntra-image-3.jpg",
    title: "Myntra",
    description:
      "Online Shopping Site for Fashion & Lifestyle in India. Buy Shoes, Clothing and Accessories.",
    link:
      "https://www.myntra.com/?utm_source=Google&utm_medium=cpc&utm_campaign=Search%20-%20Myntra%20Brand%20(India)&gclid=Cj0KCQjwufn8BRCwARIsAKzP697MqIfAKv-U12OgD3O0oVIVNL-A9V4VzGPlRB34c-swsvQguYvV5bwaAoCwEALw_wcB",
  },
  {
    id: 3,
    picture: "https://www.adgully.com/img/800/201906/hotstar.jpg",
    title: "Hot Star",
    description:
      "Watch Live Cricket Streaming online & stay updated with fastest live cricket scores",
    link: "https://www.hotstar.com/in/sports/cricket",
  },
  {
    id: 4,
    picture:
      "https://www.technotrends.co.in/wp-content/uploads/2019/01/McDonalds.jpg",
    title: "Mc Donald's",
    description: "Quick Bites - Burger, Fast Food.",
    link: "https://www.mcdelivery.co.in/home/new-launches",
  },
];

function Ad() {
  const [data] = useState(adList);
  const [rand, setRand] = useState();

  useEffect(() => {
    setRand(Math.floor(Math.random() * 4));
  }, []);
  return (
    <div className="adContainer">
      <h1 className="adHeading">Advertisement</h1>
      {data.map((ad) => (
        <div>
          {ad.id === rand ? (
            <div>
              <img className="adImage" src={ad.picture} alt="Ad"></img>
              <h1 className="adTitle">{ad.title}</h1>
              <p className="adDesc">{ad.description}</p>
              <div className="adLink">
                <a href={ad.link}>Get Started</a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default Ad;
