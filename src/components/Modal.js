import { Button, Typography } from "@mui/material";
import React from "react";

export default function Modal({ reset }) {


    return (
        <div
            style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                margin: "auto"
            }}
        >
            <div>
                <Typography variant="button" style={{ color: "white", top: "50px", display: "flex", justifyContent: "center", position: "relative", fontSize: "20px" }}>
                    You Won
                </Typography>
            </div>
            <Button variant="contained" color="primary" style={{ display: "flex", margin: "100px auto" }} onClick={reset} >
                Try Again
            </Button>
        </div>
    );
}
