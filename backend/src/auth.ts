import { Database } from "bun:sqlite";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export class UsersDatabase {
  private db: Database;

  constructor() {
    this.db = new Database("users.db");
    // Initialize the database
    this.init()
      .then(() => console.log("Database initialized"))
      .catch(console.error);
  }

  // Get all books
  async getUsers() {
    return this.db.query("SELECT * FROM users").all();
  }

  // Add a book
  async addUser(user: User) {
    // Insert the user into the database

    // password converted to hash with bcrypt
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    this.db.run(
      `INSERT INTO users (name, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}')`
    );

    // Retrieve the newly added user from the database
    const newUser = this.db
      .query(
        `SELECT * FROM users WHERE name = '${user.username}' AND email = '${user.email}' AND password = '${user.password}'`
      )
      .get();

    return newUser;
  }

  // login user function with email and password
  async loginUser(email: string, password: string) {
    const user = await this.db
      .query(`SELECT * FROM users WHERE email = '${email}'`)
      .get();
    if (!user) {
      return {
        status: 400,
        message: "User not found",
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 400,
        message: "Invalid password",
      };
    }
    const accessToken = jwt.sign(
      { email: email, userId: user.id },
      "trustmeplease",
      { expiresIn: "1h" }
    );
    return {
      status: 200,
      message: "Login successful",
      accessToken: accessToken,
    };
  }

  // Update a book
  async updateUser(id: number, user: User) {
    return this.db.run(
      `UPDATE users SET name = '${user.username}', email = '${user.email}', password = '${user.password}' WHERE id = ${id}`
    );
  }

  // Delete a book
  async deleteUser(id: number) {
    return this.db.run(`DELETE FROM users WHERE id = ${id}`);
  }

  async deleteAll() {
    return this.db.run(`DELETE FROM users`);
  }
  // Initialize the database
  async init() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)"
    );
  }
}
