import { Elysia } from "elysia";
import { User, UsersDatabase } from "./auth";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .decorate("db", new UsersDatabase())

  .get("/users", ({ db }) => db.getUsers())
  .post("/register", async ({ db, body }) => {
    const user = await db.addUser(body as User);
    console.log(user);
    return {
      status: 200,
      user: user,
    };
  })
  .delete("allUsers", async ({ db }) => {
    await db.deleteAll();
    return {
      success: true,
    };
  })

  .post("/login", async ({ db, body }) => {
    const user = await db.loginUser(body.email, body.password);
    console.log(user);
    return user;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

//
// Allowed Origins
// http://localhost:3000
// http://127.0.0.1:3000
// http://::1:3000
//
// Allowed Methods
// GET
// POST
// PUT
// PATCH
// DELETE
