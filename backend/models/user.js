"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const generator = require("generate-password");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data - used when admins register new users without providing password.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, firstName, lastName, email, isAdmin }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const password = generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
    });

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            is_admin)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [username, hashedPassword, firstName, lastName, email, isAdmin]
    );

    const user = result.rows[0];

    return user;
  }

  /** Register user - if user registering self and password included in body.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async registerSelf({
    username,
    password,
    email,
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    address,
    city,
    state,
    countryCode,
    postalCode,
    isAdmin,
  }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           ( username,
            password,
            email,
            first_name,
            last_name,
            birthDate,
            phoneNumber,
            address,
            city,
            state,
            countryCode,
            postalCode,
            isAdmin,)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [username, hashedPassword, email, firstName, lastName, birthDate, phoneNumber, address, city, state, countryCode, postalCode, isAdmin]
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  birthDate,
                  phoneNumber,
                  address,
                  city,
                  state,
                  countryCode,
                  postalCode,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, is_admin, applications }
   *   where applications is [ job_id , job_id, ...]
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
      first_name AS "firstName",
      last_name AS "lastName",
      email,
      birthDate,
      phoneNumber,
      address,
      city,
      state,
      countryCode,
      postalCode,
      is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);

    const applicationRes = await db.query(
      `SELECT job_id AS "jobId"
           FROM applications
           WHERE username = $1`,
      [username]
    );

    user.applications = applicationRes.rows.map((a) => a.jobId);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email, isAdmin }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                      first_name AS "firstName",
                      last_name AS "lastName",
                      email,
                      birthDate,
                      phoneNumber,
                      address,
                      city,
                      state,
                      countryCode,
                      postalCode,
                      is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /* apply for a job: adds app to applications (if both username and job_id are valid), returns nothing */

  static async apply(username, job_id) {
    try {
      const applicationRes = await db.query(
        `INSERT INTO applications
             (username,
              job_id)
             VALUES ($1, $2)
             RETURNING *`,
        [username, job_id]
      );
    } catch {
      throw new BadRequestError(
        `Couldn't create application. Invalid username (${username}) or job id (${job_id}) were provided. `
      );
    }
  }

  /* update status of application: adds app to applications (if both username and job_id are valid), returns nothing */

  static async updateApplication(username, job_id, status) {
    const appRes = await db.query(
      `SELECT * FROM applications WHERE username=$1 AND job_id=$2`,
      [username, job_id]
    );

    if (!appRes.rows[0]) {
      throw new NotFoundError(
        `Couldn't find application for user with username: ${username} and job with id: ${job_id}`
      );
    }
    await db.query(
      `UPDATE applications SET state=$3
      WHERE username=$1 AND job_id=$2`,
      [username, job_id, status]
    );
  }
}

module.exports = User;
