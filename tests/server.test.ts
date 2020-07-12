import http from "http";

import request from "supertest";

import { createServer } from "../src/server";

describe("GET /", () => {
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

    it("returns 200 OK and the message 'Hello World!'", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World!");
    });
});
