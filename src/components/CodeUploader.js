import React, { useState } from 'react';
import axios from 'axios';

const CodeUploader = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/code/analyze', {
                code,
                language,
            });
            setAnalysisResult(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Compiler Performance Testing Tool</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="10"
                    cols="50"
                    placeholder="Paste your code here..."
                />
                <br />
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>
                <br />
                <button type="submit">Analyze Code</button>
            </form>
            {analysisResult && (
                <div>
                    <h2>Analysis Result:</h2>
                    <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeUploader;
