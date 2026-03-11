const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
app.use(express.static(path.join(__dirname,"public")))

const cors=require("cors")
app.use(cors())
const bodyParser=require("body-parser")
app.use(bodyParser.json())

//create default API (HOME)
app.get("/",(req,res)=>{
    res.send("Welcome to <font color='red'>K234111E</font> API ")
})

app.get("/about",(req,res)=>{
  tbl="<table border='1'>"
  tbl+="<tr>"
  tbl+="<td>STUDENT ID:</td><td>K234111411</td>"
  tbl+="</tr>"
  tbl+="<tr>"
  tbl+="<td>STUDENT Name:</td><td>DANG MAI NHUNG</td>"
  tbl+="</tr>"
  tbl+="<tr>"
  tbl+="<td colspan='2'><img src='customer2.png' width='500' height='250'/></td>"
  tbl+="</tr>"   
  tbl+="</table>"
  res.send(tbl)
})

let database=[
  {
    BookId: "THCB",
    BookName: "Giáo trình Tin học cơ bản",
    Price: 260000,
    Mota: "Tin học cơ bản Windows XP gồm 7 chương...",
    Anhbia: "book1.jpg",
    Ngaycapnhat: "25/10/2014 12:00:00 SA",
    Soluongton: 120,
    MaCD: 7,
    MaNXB: 1
  },
  {
    BookId: "VB2005",
    BookName: "Visual Basic 2005 Tập 3",
    Price: 20000,
    Mota: "Lập trình Web với CSDL...",
    Anhbia: "book2.jpg",
    Ngaycapnhat: "15/09/2014 12:00:00 SA",
    Soluongton: 240,
    MaCD: 8,
    MaNXB: 4
  }
]

// GET all books
app.get("/books",(req,res)=>{
  res.send(database)
})

// GET book by id
app.get("/books/:id",cors(),(req,res)=>{
  id=req.params["id"]
  let p=database.find(x=>x.BookId==id)
  res.send(p)
})

// POST - Create new book
app.post("/books",cors(),(req,res)=>{
  //put json book into database
  database.push(req.body);
  //send message to client(send all database to client)
  res.send(database)
})

// DELETE book by id
app.delete("/books/:id",cors(),(req,res)=>{ 
  id=req.params["id"] 
  database = database.filter(x => x.BookId !== id); 
  res.send(database)     
}) 
  
// PUT - Update book
app.put("/books",cors(),(req,res)=>{ 
  book=database.find(x=>x.BookId==req.body.BookId) 
  if(book!=null) 
  { 
    book.BookName=req.body.BookName 
    book.Price=req.body.Price 
    book.Mota=req.body.Mota
    book.Anhbia=req.body.Anhbia
    book.Ngaycapnhat=req.body.Ngaycapnhat
    book.Soluongton=req.body.Soluongton
    book.MaCD=req.body.MaCD
    book.MaNXB=req.body.MaNXB
  } 
  res.send(database) 
}) 

app.listen(port,()=>{
  console.log(`K23411E Server running at ${port}`)  
})