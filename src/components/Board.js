import { CssBaseline, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Cell from './Cell';
import createBoard from './createBoard';
import Modal from './Modal';
import ModalLost from "./ModalLost";
import { revealed } from './reveal';
import StartGame from './StartGame';



export default function Board() {

    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameLost, setGameLost] = useState(false);
    const [mine, setMine] = useState(10);
    const [show, setShow] = useState(false);

    const ShowToggle = () => {
        setShow(true);
    }

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

    const newFresh = () => {
        let updatedData = grid;
        updatedData.forEach((datarow) => {
            datarow.forEach((dataitem) => {
                dataitem.revealed = true;
            });
            setGrid(updatedData)
        })
    }



    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameLost || gameOver) {
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
            newFresh();
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
            textAlign: "center"
        }}>
            {!show && <StartGame ShowToggle={ShowToggle} />}
            {show && <div>
                <Typography variant="button" style={{
                    fontSize: "25px",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "20px"
                }}>Minesweeper</Typography>
                <p>{"Mines: " + mine}</p>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", position: "relative" }}>
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

                {gameLost && <ModalLost reset={reset} />}
                {gameOver && <Modal reset={reset} />}
            </div>}
            <CssBaseline />
        </div>
    )


}
