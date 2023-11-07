/* eslint-disable no-undef */
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

//verify jwt
const verifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).send({ error: true, message: "unauthorize token" });
  }

  // token verify
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: true, message: "Forbidden Access" });
    }
    // console.log(decoded);
    req.decoded = decoded;
    next();
  });
};

// mongodb connection
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const db = client.db("earnEarly");
    const myMoney = db.collection("myMoney");
    const users = db.collection("users");

    // generate json web token
    app.post("/jwt", (req, res) => {
      const email = req.body;

      const token = jwt.sign(email, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // console.log(token);
      res.send({ token });
    });

    //user related apis
    app.post("/user", async (req, res) => {
      const user = req.body;

      try {
        const existingUser = await users.findOne({ email: user?.email });

        if (!user && !user?.password && !user?.email) {
          return res.send({ message: "User Data not found!" });
        }

        if (existingUser) {
          return res.send({ message: "user already exist!" });
        }

        //hash the password
        user.password = await bcrypt.hash(user?.password, 10);

        const result = await users.insertOne(user);

        //  jwt token
        const token = jwt.sign({ email: user?.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.send({ ...result, token });
      } catch (error) {
        res.send({ error: error.message });
      }
    });
    app.get("/user", verifyJwt, async (req, res) => {
      const userEmail = req.query.email;

      if (!userEmail) {
        const result = await users.find().toArray();
        return res.send(result);
      }

      const result = await users.findOne({ email: userEmail });
      if (!result) {
        return res.send({ message: "user not found!" });
      }
      res.send(result);
    });
    app.put("/user", verifyJwt, async (req, res) => {
      const id = req.query.id;
      const user = req.body;
      const result = await users.updateOne(
        { _id: new ObjectId(id) },
        { $set: user },
        { upsert: true }
      );
      res.send(result);
    });

    // myMoney related apis
    app.get("/my-money", verifyJwt, async (req, res) => {
      const result = await myMoney.find().toArray();
      const email = req.query.email;
      if (email) {
        const emailFilter = await myMoney.find({ email: email }).toArray();
        if (emailFilter.length === 0) {
          return res.send({ success: false, message: "invalid email address" });
        }
        return res.send({ success: true, emailFilter });
      }
      res.send(result);
    });
    app.put("/my-money/:id", verifyJwt, async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const result = await myMoney.updateOne(
        { _id: new ObjectId(id) },
        { $set: data },
        { upsert: true }
      );
      res.send(result);
    });
    app.post("/my-money", verifyJwt, async (req, res) => {
      const myMoneyData = req.body;
      const result = await myMoney.insertOne(myMoneyData);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("server is live");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
