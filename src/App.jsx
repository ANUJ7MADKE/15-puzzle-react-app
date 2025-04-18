import React, { useState } from "react";
import PuzzleBoard from "./components/PuzzleBoard";
import { idaStar } from "./solver/idaStar";
import { createSolvedBoard, shuffleBoard } from "./utils/puzzleUtils";

const SIZE = 4;

function App() {
  const [board, setBoard] = useState(createSolvedBoard(SIZE));
  const [isSolving, setIsSolving] = useState(false);
  const [solutionPath, setSolutionPath] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const shuffle = () => {
    if (isSolving) return;
    setBoard(shuffleBoard(board));
    setSolutionPath(null);
    setCurrentStep(0);
  };

  const solve = async () => {
    if (isSolving) return;
    setIsSolving(true);
    const path = idaStar(board);
    
    if (path) {
      setSolutionPath(path);
      setCurrentStep(0);
    }
    
    setIsSolving(false);
  };
  
  const applyStep = (step) => {
    if (!solutionPath || step < 0 || step >= solutionPath.length) return;
    setCurrentStep(step);
    setBoard(solutionPath[step].board);
  };
  
  const nextStep = () => {
    if (currentStep < solutionPath.length - 1) {
      applyStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      applyStep(currentStep - 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>15 Puzzle</h1>
      <PuzzleBoard board={board} setBoard={setBoard} size={SIZE} disabled={isSolving} />
      <div>
        {/* <button onClick={shuffle}>Shuffle</button> */}
        <button onClick={solve} disabled={isSolving}>{isSolving ? "Solving..." : "Solve"}</button>
      </div>
      
      {solutionPath && (
        <div style={{ 
          marginTop: "30px", 
          padding: "20px", 
          backgroundColor: "#f5f5f5", 
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          maxWidth: "90%",
          margin: "20px auto"
        }}>
          <h3 style={{ 
            marginBottom: "15px", 
            color: "#333",
            fontSize: "1.2rem"
          }}>
            Solution Progress: <span style={{ color: "#4CAF50", fontWeight: "bold" }}>{currentStep}</span> / {solutionPath.length - 1}
          </h3>
          
          {/* Display the current step explanation */}
          <div style={{
            padding: "10px 15px",
            backgroundColor: "#e8f5e9",
            border: "1px solid #c8e6c9",
            borderRadius: "5px",
            marginBottom: "15px",
            fontSize: "1.1rem",
            fontWeight: currentStep > 0 ? "bold" : "normal",
            color: "#2e7d32"
          }}>
            {currentStep > 0 ? solutionPath[currentStep].explanation : "Initial state"}
          </div>
          
          {/* Algorithm explanation */}
          <div style={{
            backgroundColor: "#fff",
            padding: "10px 15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginBottom: "15px",
            textAlign: "left",
            fontSize: "0.9rem",
            lineHeight: "1.4"
          }}>
            <h4 style={{ marginTop: 0, color: "#333" }}>About IDA* Algorithm:</h4>
            <p>
              The IDA* (Iterative Deepening A*) algorithm is used to find the optimal solution for the 15-puzzle:
            </p>
            <ol style={{ paddingLeft: "20px" }}>
              <li>It uses Manhattan distance as a heuristic to estimate the cost to reach the goal.</li>
              <li>It performs a depth-first search with an incrementally increasing threshold.</li>
              <li>At each step, it considers all possible moves and chooses the one that minimizes the cost.</li>
              <li>The algorithm guarantees finding the shortest solution path.</li>
            </ol>
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              style={{ 
                margin: "0 10px",
                padding: "8px 15px",
                backgroundColor: currentStep === 0 ? "#e0e0e0" : "#3f51b5",
                color: currentStep === 0 ? "#999" : "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentStep === 0 ? "default" : "pointer",
                fontWeight: "bold"
              }}
            >
              ← Previous
            </button>
            
            <button 
              onClick={nextStep} 
              disabled={currentStep === solutionPath.length - 1}
              style={{ 
                margin: "0 10px",
                padding: "8px 15px",
                backgroundColor: currentStep === solutionPath.length - 1 ? "#e0e0e0" : "#3f51b5",
                color: currentStep === solutionPath.length - 1 ? "#999" : "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentStep === solutionPath.length - 1 ? "default" : "pointer",
                fontWeight: "bold"
              }}
            >
              Next →
            </button>
          </div>
          
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center",
            maxHeight: "150px",
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "white"
          }}>
            {solutionPath.map((_, index) => (
              <button 
                key={index}
                onClick={() => applyStep(index)}
                style={{ 
                  margin: "3px",
                  minWidth: "30px",
                  height: "30px",
                  backgroundColor: currentStep === index ? "#4CAF50" : "#f0f0f0",
                  color: currentStep === index ? "white" : "#333",
                  border: currentStep === index ? "none" : "1px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: currentStep === index ? "bold" : "normal",
                  transition: "all 0.2s ease"
                }}
              >
                {index}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
