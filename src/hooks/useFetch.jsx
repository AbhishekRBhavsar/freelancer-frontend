import { useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);
    axios(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: { credential: response.credential }
    })
    .then((res) => {
        console.log(res);
        setLoading(false);

        // return res.json();
        return res.data.data;
      })
    .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
    .catch((error) => {
        console.log(error);
        setError(error?.message);
      });
  };

  const handleProfile = async (response) => {
    
  }
  return { loading, error, handleGoogle, handleProfile };
};


export default useFetch;