import { useState, useRef } from 'react';
import './../index.css';

const TEMPO_POMODORO_PADRAO = 1500;

function Pomodoro() {

    const [timeLeft, setTimeLeft] = useState(TEMPO_POMODORO_PADRAO);
    const intervalRef = useRef(null);

    function startTimer() {
        // Aborta caso um intervalo já esteja rodando
        if (intervalRef.current !== null) return;


        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 0) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                    return 0;
                }
                return prevTimeLeft - 1
            });
        }, 1000);
    }

    function stopTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Libera a memória para um novo Start
    }

    function resetTimer() {
        stopTimer();
        // Retorna o tempo para o valor inicial
        setTimeLeft(TEMPO_POMODORO_PADRAO);
    }

    return (
        <>
            <div className="wrapper">
                <h1>Pomodoro Timer</h1>

                <div className="timer-display">
                    <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
                    <span>:</span>
                    <span>{String(timeLeft % 60).padStart(2, "0")}</span>
                </div>

                <div className="buttons">
                    <button className="START" onClick={startTimer}>START</button>
                    <button className="STOP" onClick={stopTimer}>STOP</button>
                    <button className="RESET" onClick={resetTimer}>RESET</button>
                </div>
            </div>
        </>
    );
}

export default Pomodoro;