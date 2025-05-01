import React, { useState } from "react";
import "./index.css";

const ContentSummary = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!data) return <p>No data available.</p>;

  const filteredPoints = data.keyPoints.filter((point) =>
    point.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-summary-container">
      <h1 className="content-summary-header">Content Summary</h1>

      <h2 className="content-summary-subheader">Title</h2>
      <p>
        <strong>{data.title}</strong>
      </p>

      <h2 className="content-summary-subheader">Summary</h2>
      <p>{data.summary}</p>

      <h2 className="content-summary-subheader">Key Points</h2>

      <input
        type="text"
        className="content-summary-search"
        placeholder="Search key points..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ overflowX: "auto" }}>
        <table className="content-summary-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Key Insight</th>
            </tr>
          </thead>
          <tbody>
            {filteredPoints.map((point, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="content-summary-meta">
        <strong>URL:</strong>{" "}
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          {data.url}
        </a>
      </div>
    </div>
  );
};

export default ContentSummary;
