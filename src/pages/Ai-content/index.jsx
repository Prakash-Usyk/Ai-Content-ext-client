import React, { useEffect, useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import ContentSummary from "../../components/table-component";

const AicontentExt = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}` + `ai-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();

      if (data.type === "success") {
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }
      setResponseData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast.error("Failed to fetch content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const validateUrl = (value) => {
      try {
        new URL(value);
        return true;
      } catch (err) {
        return false;
      }
    };

    setIsValidUrl(validateUrl(url));
  }, [url]);

  return (
    <div className="app-container">
      <h1 className="title">AI Content Extractor</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a public URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={!isValidUrl}>
          Extract
        </button>
      </div>
      {url && (
        <div style={{ color: isValidUrl ? "green" : "red" }}>
          {!isValidUrl && "Invalid URL"}
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <FadeLoader height={10} />
        </div>
      )}

      {responseData && <ContentSummary data={responseData.data} />}
    </div>
  );
};

export default AicontentExt;
