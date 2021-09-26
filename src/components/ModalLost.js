import { Button, Typography } from "@mui/material";
import React from "react";

export default function ModalLost({ reset }) {



    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                background: "#FF5C58",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"

            }}
        >
            <div>
                <Typography variant="button" style={{ color: "white", top: "50px", display: "flex", justifyContent: "center", position: "relative", fontSize: "20px" }}>
                    You Lost
                </Typography>
            </div>
            <Button variant="contained" color="secondary" style={{ display: "flex", margin: "100px auto" }} onClick={reset} >
                Try Again
            </Button>
        </div>
    );
}
