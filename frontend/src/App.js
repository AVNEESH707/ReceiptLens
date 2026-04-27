import React, { useState } from "react";
import Upload from "./components/Upload";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-xl">
        
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Receipt OCR Analyzer
        </h1>

        <Upload setResult={setResult} />
        <Result result={result} />

      </div>

    </div>
  );
}

export default App;