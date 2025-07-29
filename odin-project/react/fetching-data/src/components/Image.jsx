import { useEffect, useState } from "react";

const Image = () => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors"})
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].url);
      setImageURL(data[0].url)
    })
    .catch((error) => console.error(error));
  }, []);

  return (
    imageURL && (
      <>
        <h1>An image</h1> 
        <img src={imageURL} alt={"placeholder text"}/>
      </>
    )
  )
}

export default Image;