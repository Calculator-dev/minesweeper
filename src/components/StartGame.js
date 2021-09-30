import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const Root = styled("div")({
    position: "absolute",
    background: "#3D56B2",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
})

const Header = styled(Typography)({
    color: "white",
    fontSize: "25px",
    marginBottom: "20px"
})

const StartButton = styled(Button)({
    color: "white",
    border: "1px solid white",
    '&:hover': {
        border: "1px solid white",
        background: "white",
        color: "#3d56b2"
    },
})

const StartSpan = styled("span")({
    color: "#FB9300"
})

export default function StartGame({ ShowToggle }) {
    return (
        <Root>
            <Header>
                Welcome to Minesweeper Game. Click <StartSpan>Start Game</StartSpan> to begin.
            </Header>
            <StartButton variant="outlined" onClick={ShowToggle}>
                Start Game
            </StartButton>
        </Root>
    )
}
