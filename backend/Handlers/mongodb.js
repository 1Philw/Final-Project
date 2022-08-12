"use strict";
const { parse } = require("dotenv");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const addUser = async (req, res) => {
  console.log(req.body);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db
      .collection("users")
      .insertOne({ _id: _json.steamid, user: _json.personaname });
    console.log("Success");
    return result
      ? res
          .status(200)
          .json({ status: 200, data: req.body, message: "User Created!" })
      : res
          .status(400)
          .json({ status: 400, message: "Error please try again." });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

const updateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("users").updateOne();
    console.log("Success");
    return result
      ? res
          .status(200)
          .json({ status: 200, data: req.body, message: "User Updated" })
      : res
          .status(400)
          .json({ status: 400, message: "Error please try again." });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

const postComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("comments").insertOne(req.body);
    console.log("Success");
    return result
      ? res.status(200).json({
          status: 200,
          data: req.body,
          message: "Commented Succesfully!",
        })
      : res
          .status(400)
          .json({ status: 400, message: "Error please try again." });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

const findComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("comments").find().toArray();
    console.log("Success");
    return result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "Commented Succesfully Retrieved",
        })
      : res
          .status(400)
          .json({ status: 400, message: "Error please try again." });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = {
  addUser,
  postComment,
  findComment,
};
