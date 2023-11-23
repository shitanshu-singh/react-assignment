import React, { useEffect, useState } from "react";
import "./clock.css";
import { Button } from "@mui/material";

const Clock = ({ time }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const playPause = () => {
    setIsRunning(!isRunning);
  };
  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      if (isRunning) {
        setSeconds(seconds + 1);
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
        if (minutes === 59) {
          setHours(hours + 1);
          setMinutes(0);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  });
  useEffect(() => {
    setSeconds(Number(time.slice(6, 8)));
    setMinutes(Number(time.slice(3, 5)));
    setHours(Number(time.slice(0, 2)));
  }, [time]);

  return (
    <div className="clock">
      <h2>
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </h2>
      <Button variant="outlined" onClick={playPause}>
        Pause/Start
      </Button>
    </div>
  );
};

export default Clock;
