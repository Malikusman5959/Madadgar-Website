import React from "react";
import { useEffect, useState } from "react";
function Images(props) {
  const [url, setUrl] = useState("");
  let [image, setImage] = useState("");

  const updatePhoto = (file) => {
    setImage(file);
    console.log(image);
  };
  const postImage = () => {
    if (image !== "") {
      console.log(image);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "qitwzs7qac");
      data.append("cloud_name", "madadgar");
      fetch("https://api.cloudinary.com/v1_1/madadgar/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no images");
    }
  };

  return (
    <div>
      <div className="btn #64b5f6 blue darken-1">
        <span>Select pic</span>
        <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
      </div>
      <button onClick={() => postImage()}>TEseet</button>
      <div>{url === "" ? "Select File" : `File Uploaded ${url}`}</div>

      <div>{url === "" ? <div></div> : <img src={url} alt="Images" />}</div>
    </div>
  );
}

export default Images;
