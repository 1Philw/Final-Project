"use strict";
const { parse } = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// Handler for adding a user.
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

// Handler for getting a user and its data.
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("users").findOne({ _id });
    console.log("Success");
    return result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "Successfully retrieved user.",
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

// const updateUser = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   try {
//     await client.connect();

//     const db = client.db("final");
//     console.log("Connected!");

//     const result = await db.collection("users").updateOne();
//     console.log("Success");
//     return result
//       ? res
//           .status(200)
//           .json({ status: 200, data: req.body, message: "User Updated" })
//       : res
//           .status(400)
//           .json({ status: 400, message: "Error please try again." });
//   } catch (err) {
//     res.status(500).json({ status: 500, data: req.body, message: err.message });
//     console.log(err.stack);
//   } finally {
//     client.close();
//     console.log("Disconnected");
//   }
// };

// Handler for posting a comment to our database.
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

// Handler for finding a comment/comments from our comments collection in database.
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
          message: "Commented Succesfully Retrieved.",
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

// Handler for removing a comment from our collecton/database.
const removeComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.body._id;
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("comments").deleteOne({ _id: _id });

    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "Succesfully deleted comment." });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Error please try again." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

// Handler for adding a favorite for current user to our database.
const addFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  const { name, image } = req.body;

  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("users").findOne({ _id });

    const favorites = result.favorites;
    favorites.push({
      name: name,
      image: image,
    });
    const result2 = await db
      .collection("users")
      .updateOne({ _id }, { $set: { favorites } });
    console.log("Success");
    return result2
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "Succesfully added to favorites.",
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

// Hanlder for removing a favorite for current user from database.
const removeFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;

  const { name, image } = req.body;
  console.log(req.body);
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("users").findOne({ _id });
    console.log(result);
    const favorites = result.favorites;
    const filtered = favorites.filter((favorite) => {
      return favorite.name !== name;
    });
    const result2 = await db
      .collection("users")
      .updateOne({ _id }, { $set: { favorites: filtered } });
    console.log("Success");
    return result2
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "Succesfully removed favorite.",
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

// Handler for adding a like for current user to database.
const addLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  const { name, image } = req.body;

  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("users").findOne({ _id });

    const likes = result.likes;
    likes.push({
      name: name,
      image: image,
    });
    const result2 = await db
      .collection("users")
      .updateOne({ _id }, { $set: { likes } });
    console.log("Success");
    return result2
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "Succesfully added to likes.",
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

// Handler for removing a like for current user from database.
const removeLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;

  const { name, image } = req.body;
  console.log(req.body);
  try {
    await client.connect();

    const db = client.db("final");
    console.log("Connected!");

    const result = await db.collection("users").findOne({ _id });
    console.log(result);
    const likes = result.likes;
    const filtered = likes.filter((like) => {
      return like.name !== name;
    });
    const result2 = await db
      .collection("users")
      .updateOne({ _id }, { $set: { likes: filtered } });
    console.log("Success");
    return result2
      ? res.status(200).json({
          status: 200,
          data: { ...req.body },
          message: "Succesfully removed like.",
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
  addFavorite,
  removeFavorite,
  getUser,
  addLike,
  removeLike,
  removeComment,
};
