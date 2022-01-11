import { useState } from "react";

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReq = async (apiReq, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(apiReq.url, {
        method: apiReq.method ? apiReq.method : "GET",
        body: apiReq.body ? JSON.stringify(apiReq.body) : null,
        headers: apiReq.headers ? apiReq.headers : { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    error,
    sendReq,
  };
};

export default useHTTP;
