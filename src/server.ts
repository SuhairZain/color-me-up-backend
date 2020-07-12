import express from "express";

export const createServer = (port: number) => {
    const app = express();

    const NODE_ENV = app.get("env");

    app.get("/", (_, res) => res.send("Hello World!"));

    // If we listen on test env and we test in watch mode, an error
    // will be thrown because of the existing listener not being cleared.
    if (NODE_ENV !== "test") {
        app.listen(port, () =>
            console.log(`Example app listening at http://localhost:${port}`)
        );
    }

    return app;
};
