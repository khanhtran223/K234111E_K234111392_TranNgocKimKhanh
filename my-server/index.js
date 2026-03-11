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
app.listen(port,()=>{
  console.log(`K23411E Server running at ${port}`)  
})
let database=[
{"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản",
"Price":70,"Image":"book1.jpg"},
{"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao",
"Price":100,"Image":"book2.jpg"},
{"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"book3.jpg"},
{"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"book4.jpg"},
{"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"book5.jpg"},
]
app.get("/books",(req,res)=>{
  res.send(database)
})
app.get("/books/:id",cors(),(req,res)=>{
  id=req.params["id"]
  let p=database.find(x=>x.BookId==id)
  res.send(p)
  })
app.post("/books",cors(),(req,res)=>{
  // console.log(req.body)
  // res.send("Server received your data, Your data:"+req.body)
  //put json book into database
  database.push(req.body);
  //send message to client(send all database to client)
  res.send(database)

app.delete("/books/:id",cors(),(req,res)=>{ 
  id=req.params["id"] 
  database = database.filter(x => x.BookId !== id); 
  res.send(database)     
}) 
  
app.put("/books",cors(),(req,res)=>{ 
  book=database.find(x=>x.BookId==req.body.BookId) 
  if(book!=null) 
    { 
    book.BookName=req.body.BookName 
    book.Price=req.body.Price 
    book.Image=req.body.Image 
    } 
  res.send(database) 
  }) 
}
)