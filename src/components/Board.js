import { useState } from 'react';
import { Square } from './Square';

export function Board(props) {
    let spacesInBoard = 9;
    let [gameOpen, setGameOpen] = useState(true);
    let [squares, setSquares] = useState(Array(spacesInBoard).fill(''));
    let [xTurn, setXTurn] = useState(true);
    let [message, setMessage] = useState(`É a vez de X jogar.`);
    let gameBoard = Array(spacesInBoard);


    function changeTurn(xTurn) {
        return !xTurn;
    }
    function currentPlay(xTurn) {
        if (xTurn) {
            return 'X';
        } else {
            return 'O';
        }
    }
    function gameStatus(currentSquares) {
        if (IsTherewinner(currentSquares)) {
            let winner = xTurn
                ? 'X venceu a partida'
                : 'O venceu a partida';
            //finaliza o jogo
            setGameOpen(false);
            //informa quem foi o vencedor
            setMessage(winner);
        } else {
            let nextMove = changeTurn(xTurn);
            //inverte a jogada para o próximo jogador
            setXTurn(nextMove);
            //informa quem é o próximo a jogador se ainda houver square disponível
            if(!currentSquares.includes('')){
                setMessage('Parece que ninguém venceu...');
            }else{
                if (nextMove) {
                    setMessage('É a vez de X jogar.');
                } else {
                    setMessage('É a vez de O jogar.');
                }
            }
        }
    }
    function handleSquareClick(i) {
        if (gameOpen) {
            //obtém cópia da matriz de casas do tabuleiro
            let currentSquares = squares.slice();
            //Informa que a casa clicada recebe a jogada da vez
            currentSquares[i] = currentPlay(xTurn);
            //Atualiza a matriz de casas do tabuleiro
            setSquares(currentSquares);
            //Muda o turno ou finaliza o jogo
            gameStatus(currentSquares);
        }
    }
    function IsTherewinner(currentSquares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
                return currentSquares[a];
            }
        }
        return null;
    }

    for (let i = 0; i < spacesInBoard; i++) {
        gameBoard[i] = (
            <Square
                key={i}
                value={squares[i]}
                squareClick={() => { handleSquareClick(i) }} />
        );
    }
    return (
        <div className="board">
            <div className="board-squares">
                {gameBoard}
            </div>
            <span className="board-status">{message}</span>
        </div>
    );
}