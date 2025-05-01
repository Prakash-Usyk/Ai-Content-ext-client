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

  // const filteredData = responseData?.data?.filter(
  //   (item) =>
  //     (filter ? item.category === filter : true) &&
  //     (search
  //       ? item.keyPoint.toLowerCase().includes(search.toLowerCase()) ||
  //         item.tags.toLowerCase().includes(search.toLowerCase())
  //       : true)
  // );

  //   const handleSubmit = () => {
  //     setIsLoading(true);
  //     setTimeout(() => setIsLoading(false), 1500);
  //   };

  const handleSubmit = async () => {
    console.log("cominnnn");
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const res = await fetch("http://localhost:3000/ai-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      console.log(res, "ressss");

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      if (data.type === "success") {
        toast.success(data.data.message);
      } else {
        toast.error(data.data.message);
      }

      console.log(data, "dataaaa");
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
          <FadeLoader />
        </div>
      )}

      {/* <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Feature">Feature</option>
          <option value="Benefit">Benefit</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Key Point</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.keyPoint}</td>
                <td>{item.category}</td>
                <td>{item.tags}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

      {responseData && <ContentSummary data={responseData.data} />}
    </div>
  );
};

export default AicontentExt;
