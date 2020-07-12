import express from "express";

import { createBoard } from "color-me-up-shared";

const BASE_URL = "/api";

export const createServer = (port: number) => {
    const app = express();
    app.use(express.json());

    const NODE_ENV = app.get("env");

    app.get(`${BASE_URL}/start`, (req, res) => {
        const { size = "6", numberOfColors = "6" } = req.query;

        const sizeInt = Number.parseInt(typeof size === "string" ? size : "");
        const numberOfColorsInt = Number.parseInt(
            typeof numberOfColors === "string" ? numberOfColors : ""
        );

        if (sizeInt <= 0 || numberOfColorsInt <= 0) {
            res.status(400).json({
                reason: "Invalid params",
                params: { size, numberOfColors },
            });
            return;
        }

        const board = createBoard(sizeInt, numberOfColorsInt);

        res.json(board);
    });

    // If we listen on test env and we test in watch mode, an error
    // will be thrown because of the existing listener not being cleared.
    if (NODE_ENV !== "test") {
        app.listen(port, () =>
            console.log(
                `Color me up backend listening at http://localhost:${port}`
            )
        );
    }

    return app;
};
