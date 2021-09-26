import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Cell from './Cell';
import createBoard from './createBoard';
import Modal from './Modal';
import ModalLost from "./ModalLost";
import { revealed } from './reveal';

export default function Board() {

    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameLost, setGameLost] = useState(false);
    const [mine, setMine] = useState(10);

    useEffect(() => {
        freshBoard();
    }, [])


    const freshBoard = () => {
        const newBoard = createBoard(8, 8, 10);
        setNonMineCount(8 * 8 - 10);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
    }

    const reset = () => {
        freshBoard();
        setGameOver(false);
        setGameLost(false);
        setMine(10);
    }

    const updateFlag = (x, y) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged = !newGrid[x][y].flagged;
        if (newGrid[x][y].flagged && mine >= 1) {
            setMine(mine - 1);
        } else if (!newGrid[x][y].flagged && mine <= 9) {
            setMine(mine + 1)
        } else {
            return;
        }

        setGrid(newGrid);
    }




    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameOver || gameLost) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][
                    mineLocations[i][1]
                ].revealed = true;
            }
            setGrid(newGrid);
            setGameLost(true);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount);
            if (newRevealedBoard.newNonMinesCount === 0) {
                setGameOver(true)
            }
        }

    }




    return (
        <div style={{
            margin: "100px auto",
            width: "600px",
            height: "500px",
            background: "#1DB9C3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }} >
            <Typography variant="button" style={{
                color: "white",
                fontSize: "20px",

            }}>Minesweeper</Typography>
            <p>{"Mines: " + mine}</p>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", position: "relative" }}>
                {gameLost && <ModalLost reset={reset} />}
                {gameOver && <Modal reset={reset} />}
                {
                    grid.map((singleRow, i1) => {
                        return (
                            <div style={{ display: "flex" }} key={i1}>
                                {singleRow.map((singleBlock, i2) => {
                                    return <Cell setMine={setMine} mine={mine} revealCell={revealCell} details={singleBlock} updateFlag={updateFlag} key={i2} />
                                })}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )


}
