import React, { useState, useEffect } from "react";

import axios from "axios";

import Media from "../Media/Media";
function Gallery() {
  const [albums, setAlbums] = useState({});

  useEffect(() => {
    axios
      .get("http://192.168.0.53:8000/getAlbums")
      .then((result) => {
        let albumList = result.data.data;

        Promise.allSettled(
          albumList.map((album) =>
            axios
              .get(`http://192.168.0.53:8000/getAlbum/${album}`)
              .then((result) => result.data.data)
              .catch((err) => {
                console.log(err);
              })
          )
        )
          .then((result) => {
            let albumsValues = {};
            result.forEach((element) => {
              albumsValues[element.value.name] = element.value;
            });
            return albumsValues;
          })
          .then((result) => {
            setAlbums(result);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Gallery container">
      <div className="row">
        <div className="col">
          <p>Gallery</p>
        </div>
      </div>

      {Object.entries(albums).map((element) => {
        let [albumName, value] = element;
        return (
          <div key={albumName} className="row">
            <div className="col">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <h2>{albumName}</h2>
                  </div>
                </div>
                <div className="row">
                  {value.content.map((media) => (
                    <Media key={media.name} data={media} className="col" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
