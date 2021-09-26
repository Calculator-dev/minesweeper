import { styled } from '@mui/material/styles';
import React from 'react'

const Root = styled("div")({
    cursor: "pointer",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    border: "0.5px solid #1E3F66"
})

export default function Cell({ details, updateFlag, revealCell, setMine, mine }) {


    const style = {
        background: details.revealed
            ? details.value === "X"
            : cubeColor(details.x, details.y)
    }

    const onClickFlag = (e) => {
        e.preventDefault();
        updateFlag(details.x, details.y)
    }


    const onClickUpdate = () => {
        if (details.flagged) {
            return;
        }
        revealCell(details.x, details.y)
    }

    return (
        <Root style={style} onContextMenu={(e) => onClickFlag(e)} onClick={() => onClickUpdate()}>
            {!details.revealed && details.flagged ? "🚩" : details.revealed && details.value !== 0 ? (details.value === "X" ? "💣" : details.value) : ("")}
        </Root>
    )
}

const cubeColor = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
        return "#1E3F66";
    } else if (x % 2 === 0 && y % 2 !== 0) {
        return "#ADD8E6";
    } else if (x % 2 !== 0 && y % 2 === 0) {
        return "#ADD8E6";
    } else {
        return "#1E3F66";
    }
};
