import React from "react";

import { Player } from "video-react";

const EXTENSIONS_PHOTO = ["jpg", "png"];
const EXTENSIONS_VIDEO = ["mp4"];

function Media(props) {
  let data = props.data;

  const url = `http://192.168.0.53:8000/getMedia/${data.url}`;
  return (
    <div className="Media col-3">
      {data.extension &&
        EXTENSIONS_PHOTO.includes(data.extension.toLowerCase()) && (
          <img src={url} alt={data.name} />
        )}

      {data.extension &&
        EXTENSIONS_VIDEO.includes(data.extension.toLowerCase()) && (
          <Player
            playsInline
            poster="/assets/poster.png"
            src={url}
            preload="none"
          />
        )}
    </div>
  );
}

export default Media;
