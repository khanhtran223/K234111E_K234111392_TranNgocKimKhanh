const express = require('express');
const app = express();
const port = 4000;

const morgan = require("morgan")
app.use(morgan("combined"))

const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());

const cors = require("cors");
app.use(cors())

app.listen(port, () => {
  console.log(`server-fashion listening on port ${port}`)
})

app.get("/", (req, res) => {
  res.send("This Web server is processed for Fashion - BT58")
})

// ===== KẾT NỐI MONGODB =====
const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion58");

// ===== API 1: Lấy TẤT CẢ Fashion, sắp xếp createdAt giảm dần =====
app.get("/fashions", cors(), async (req, res) => {
  const result = await fashionCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  res.send(result)
})

// ===== API 2: Lọc Fashion theo Style =====
app.get("/fashions/style/:style", cors(), async (req, res) => {
  const result = await fashionCollection
    .find({ style: req.params["style"] })
    .sort({ createdAt: -1 })
    .toArray();
  res.send(result)
})

// ===== API 3: Lấy 1 Fashion theo ID =====
app.get("/fashions/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0])
})

// ===== API 4: Thêm mới Fashion =====
app.post("/fashions", cors(), async (req, res) => {
  // Tự động thêm createdAt khi insert
  const newFashion = {
    ...req.body,
    createdAt: new Date()
  }
  await fashionCollection.insertOne(newFashion)
  res.send(newFashion)
})

// ===== API 5: Sửa Fashion =====
app.put("/fashions", cors(), async (req, res) => {
  await fashionCollection.updateOne(
    { _id: new ObjectId(req.body._id) },
    {
      $set: {
        title: req.body.title,
        details: req.body.details,
        thumbnail: req.body.thumbnail,
        style: req.body.style
      }
    }
  )
  var o_id = new ObjectId(req.body._id);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0])
})

// ===== API 6: Xóa Fashion theo ID =====
app.delete("/fashions/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  await fashionCollection.deleteOne({ _id: o_id })
  res.send(result[0])
})