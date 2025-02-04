import { after, before, beforeEach, describe, it } from "node:test";
import * as t from "typed-assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";
import userService from "../src/services/user.service";
import config from "../src/utils/config";

const request = supertest(app);

before(async () => {
  await mongoose.connect(config.MONGODB_URI);
});

after(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("/api/auth", async () => {
  before(async () => {
    await userService.deleteAllUsers();
  });

  after(async () => {
    await userService.deleteAllUsers();
  });

  const signupPayload = {
    username: "jdoe",
    email: "johndoe@unknown.com",
    password: "aweakpassword",
  };

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, ...loginPayload } = signupPayload;

  describe("signup", async () => {
    describe("given valid input", () => {
      it("should create the user in the db", async () => {
        const response = await request
          .post("/api/auth/signup")
          .send(signupPayload)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        const returnedUser = response.body;
        const userInDb = await userService.findUserById(returnedUser.id);

        t.isNotNull(userInDb);
        t.assert(userInDb.username === returnedUser.username);
        t.assert(userInDb.email === returnedUser.email);
        t.assert(userInDb.password.length === 60);
      });
    });
    describe("given invalid input", () => {
      it("should fail with appropriate status code", async () => {
        await request
          .post("/api/auth/signup")
          .send({ username: "jdoe", email: "jdoe@gmail.com" })
          .expect(400);
        await request
          .post("/api/auth/signup")
          .send({ username: "jdoe", password: "password" })
          .expect(400);
        await request
          .post("/api/auth/signup")
          .send({ email: "jdoe@unknown.com", password: "password" })
          .expect(400);
      });
    });
  });

  describe.only("login", async () => {
    beforeEach(async () => {
      await userService.deleteAllUsers();
      await request.post("/api/auth/signup").send(signupPayload);
    });
    describe("given valid credentials", async () => {
      it("should return the auth token", async () => {
        const response = await request
          .post("/api/auth/login")
          .send(loginPayload)
          .expect(200)
          .expect("Content-Type", /application\/json/);
        const token = response.body.token;
        t.isString(token);
      });
    });
    describe("given invalid credentials", async () => {
      it("should fail with unauthorized status code", async () => {
        await request
          .post("/api/auth/login")
          .send({ ...loginPayload, password: "wrongpassword" })
          .expect(401);
      });
    });
    describe("given invalid input", () => {
      it("should fail with bad request status code", async () => {
        await request.post("/api/auth/login").send({}).expect(400);
        await request
          .post("/api/auth/login")
          .send({ username: loginPayload.username })
          .expect(400);
        await request
          .post("/api/auth/login")
          .send({ password: loginPayload.password })
          .expect(400);
      });
    });
  });
});
