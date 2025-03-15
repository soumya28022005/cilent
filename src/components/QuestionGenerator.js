import React, { useState } from "react";
import axios from "axios";

const QuestionGenerator = () => {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://exam-prep-rp4x.onrender.com/api/questions/generate",
        { topic }
      );
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      generateQuestion();
    }
  };

  return (
    <div style={{ textAlign: "left", margin: "20px 50px" }}>
      <h2>AI Question Generator</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
  type="text"
  placeholder="Enter topic"
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  onKeyDown={handleKeyPress}
  style={{
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "280px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.2)",
  }}
/>
<button
  onClick={generateQuestion}
  disabled={loading}
  style={{
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: loading ? "#007bff" : "#ff4081", // Blue when loading
    color: "#fff",
    cursor: loading ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
  }}
>
  {loading ? <span className="loader"></span> : "Generate"}
</button>

      </div>

      {question && !loading && (
        <div style={{ marginTop: "15px" }}>
          <h3>{question.question}</h3>
          {question.options.map((opt, index) => (
            <p key={index} style={{ margin: "5px 0" }}>
              {opt}
            </p>
          ))}
        </div>
      )}

      <style>
        {`
          .loader {
            width: 14px;
            height: 14px;
            border: 2px solid #fff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            display: inline-block;
            animation: spin 0.8s linear infinite;
          }
            button:hover {
            background-color: #ff6384;
            transform: scale(1.05);
            box-shadow: 0px 5px 15px rgba(255, 99, 132, 0.5);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        
      </style>
    </div>
  );
};

export default QuestionGenerator;
