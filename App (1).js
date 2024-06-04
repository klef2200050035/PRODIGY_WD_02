import React, { useState, useEffect } from 'react';
import './App.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      
      return () => clearInterval(intervalId);
    }
  }, [isRunning, startTime]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setElapsedTime(Date.now() - startTime);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      const lapTime = new Date(elapsedTime).toISOString().substr(11, 8);
      setLaps([...laps, lapTime]);
    }
  };

  return (
    <div className="container">
      <div className="stopwatch">{new Date(elapsedTime).toISOString().substr(11, 8)}</div>
      <div className="buttons">
        <button className={`startStop ${isRunning ? 'stop' : 'start'}`} onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button className="reset" onClick={handleReset}>Reset</button>
        <button className="lap" onClick={handleLap}>Lap</button>
      </div>
      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>{lap}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stopwatch;
