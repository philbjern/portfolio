import { useEffect, useState } from "react";

export default function Clock(props) {

  const [counter, setCounter] = useState(0);

  // Without useEffect, but with useState instead
  // setInterval(() => {
  //   setCounter(count => count + 1);
  // }, 1000)

  useEffect(() => {
    const key = setInterval(() => {
      setCounter(count => count + 1);
    }, 1000)

    return () => {
      clearInterval(key);
    }
  }, [])

  // useEffect(() => {
  //   // This runs after every render
  // });

  // useEffect(() => {
  //   // This runs only on mount (when the component appears)
  // }, []);

  // useEffect(() => {
  //   // This runs on mount *and also* if either a or b have changed since the last render
  // }, [a, b]);


  // useEffect(
  //   () => {
  //     // execute side effect
  //     return () => {
  //       // cleanup function on unmounting or re-running effect
  //     }
  //   },
  //   // optional dependency array
  //   [/* 0 or more entries */]
  // )

  return (
    <p>{counter} seconds have passed.</p>
  )

}