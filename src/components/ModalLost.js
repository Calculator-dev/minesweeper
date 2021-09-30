import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const Root = styled("div")({
    width: "20%",
    display: "flex",
    flexDirection: "column",
    margin: "auto"
})

export default function ModalLost({ reset }) {
    return (
        <Root>
            <Typography variant="button" style={{ display: "flex", justifyContent: "center", position: "relative", fontSize: "30px", marginTop: "20px", color: "red" }}>
                You Lost
            </Typography>
            <Button variant="contained" color="primary" style={{ display: "flex", margin: "20px auto" }} onClick={reset} >
                Try Again
            </Button>
        </Root>
    );
}
