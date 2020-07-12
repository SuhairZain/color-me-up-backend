import http from "http";

import request from "supertest";

import { Board } from "color-me-up-shared";

import { createServer } from "../src/server";

describe("Color me up backend", () => {
    let app: ReturnType<typeof createServer>;
    let server: http.Server;

    beforeAll((done) => {
        app = createServer(5000);
        server = http.createServer(app);
        server.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    describe("GET /start", () => {
        it("Creates a board with default options", async () => {
            const response = await request(app).get("/api/start");

            expect(response.status).toBe(200);

            const board: Board = response.body;

            expect(Array.isArray(board.colors)).toBe(true);
            expect(board.colors.length).toBeGreaterThan(0);

            expect(Array.isArray(board.tiles)).toBe(true);
            expect(board.colors.length).toBe(6);

            expect(board.tiles.length).toBe(6);
            expect(board.tiles[0].length).toBe(6);
        });

        it("Creates a board of the required size", async () => {
            const response = await request(app)
                .get("/api/start")
                .query({ size: 3, numberOfColors: 3 });

            expect(response.status).toBe(200);

            const board: Board = response.body;

            expect(board.colors.length).toBe(3);

            expect(board.tiles.length).toBe(3);
            expect(board.tiles[0].length).toBe(3);
        });

        it("Returns 400 when params are invalid", async () => {
            const response = await request(app)
                .get("/api/start")
                .query({ size: "-12", numberOfColors: false });

            expect(response.status).toBe(400);

            expect(response.body).toEqual({
                reason: "Invalid params",
                params: { size: "-12", numberOfColors: "false" },
            });
        });
    });
});
