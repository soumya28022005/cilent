import React, { useState } from "react";
import axios from "axios";

const QuestionGenerator = () => {
    const [topic, setTopic] = useState("");
    const [question, setQuestion] = useState(null);

    const generateQuestion = async () => {
        const response = await axios.post("http://localhost:5000/api/questions/generate", { topic });
        setQuestion(response.data);
    };

    return (
        <div>
            <h2>AI Question Generator</h2>
            <input type="text" placeholder="Enter topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
            <button onClick={generateQuestion}>Generate</button>

            {question && (
                <div>
                    <h3>{question.question}</h3>
                    {question.options.map((opt, index) => (
                        <p key={index}>{opt}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionGenerator;