import { Button, Typography } from "@mui/material";
import React from "react";

export default function Modal({ reset }) {
    return (
        <div
            style={{
                height: "200px",
                width: "200px",
                position: "absolute",
                background: "#F0A500",
                borderRadius: "5px",
                textAlign: "center",
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
