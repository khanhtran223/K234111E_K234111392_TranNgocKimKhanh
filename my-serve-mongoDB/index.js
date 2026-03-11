const express = require('express');
const app = express();
const port = 3002;


const uri = "mongodb://localhost:27017";

// ✅ require TẤT CẢ thư viện TRƯỚC TIÊN
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require('mongodb');


app.use('/images', express.static('images'));

const SECRET_KEY = "mySecretKey123";

// ✅ middleware TRƯỚC tất cả route
app.use(morgan("combined"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// ✅ Kết nối MongoDB TRƯỚC khi khai báo route
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");
const usersCollection = database.collection("users");



app.post("/login", cors(), async (req, res) => {
    // Bước 3.1: Lấy username và password từ body request
    var username = req.body.username;
    var password = req.body.password;

    try {
        // Bước 3.2: Kết nối MongoDB, tìm user khớp cả username lẫn password
        const client = await MongoClient.connect(uri);
        const db = client.db("FashionData");
        const collection = db.collection("User");

        // Tìm document có username VÀ password khớp
        var user = await collection.findOne({
            username: username,
            password: password
        });

        if (user != null) {
            // Đăng nhập thành công → lưu Cookie
            res.cookie("saved_username", username);
            res.cookie("saved_password", password);
            res.json({ message: "Login successful", success: true });
        } else {
            // Sai tài khoản
            res.json({ message: "Wrong username or password", success: false });
        }

        client.close();

    } catch (err) {
        res.json({ message: "Server error: " + err, success: false });
    }
})


// ✅ app.listen
app.listen(port, () => {
    console.log(`My Server listening on port ${port}`);
});

// ==================== FASHION ROUTES ====================

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB");
});

app.get("/fashions", cors(), async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result);
});

app.get("/fashions/:id", cors(), async (req, res) => {
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({ _id: o_id }).toArray();
    res.send(result[0]);
});

app.post("/fashions", cors(), async (req, res) => {
    await fashionCollection.insertOne(req.body);
    res.send(req.body);
});

app.put("/fashions",cors(),async(req,res)=>{    
//update json Fashion into database 
await fashionCollection.updateOne( 
{_id:new ObjectId(req.body._id)},//condition for update 
{ $set: { //Field for updating 
style: req.body.style, 
fashion_subject:req.body.fashion_subject, 
fashion_detail:req.body.fashion_detail, 
fashion_image:req.body.fashion_image 
}  
} 
) 
//send Fahsion after updating 
var o_id = new ObjectId(req.body._id); 
const result = await fashionCollection.find({_id:o_id}).toArray();     
res.send(result[0]) 
}) 

app.delete("/fashions/:id",cors(),async(req,res)=>{    
//find detail Fashion with id 
var o_id = new ObjectId(req.params["id"]); 
const result = await fashionCollection.find({_id:o_id}).toArray();  
//update json Fashion into database 
await fashionCollection.deleteOne( 
{_id:o_id} 
) 
//send Fahsion after remove 
res.send(result[0]) 
}) 

// ==================== AUTH ROUTES ====================

app.post("/register", cors(), async (req, res) => {
    const { username, password } = req.body;

    const existing = await usersCollection.findOne({ username: username });
    if (existing) {
        return res.status(400).json({ message: "Username đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, password: hashedPassword });

    res.json({ message: "Đăng ký thành công!" });
});

app.post("/login", cors(), async (req, res) => {
    const { username, password } = req.body;

    const user = await usersCollection.findOne({ username: username });
    if (!user) {
        return res.status(400).json({ message: "Sai username hoặc password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Sai username hoặc password!" });
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Đăng nhập thành công!",
        token: token,
        username: user.username
    });
});

var cookieParser = require('cookie-parser'); 
app.use(cookieParser());
 
app.get("/create-cookie",cors(),(req,res)=>{ 
    res.cookie("username","DANGMAINHUNG") 
    res.cookie("password","123456") 
    account={"username":"DANGMAINHUNG", 
            "password":"123456"} 
    res.cookie("account",account) 
    res.send("cookies are created") 
})

app.get("/clear-cookie",cors(),(req,res)=>{ 
    res.clearCookie("account") 
    res.send("[account] Cookie is removed")     
}) 

app.get("/read-cookie",cors(),(req,res)=>{ 
//cookie is stored in client, so we use req 
    username=req.cookies.username 
    password=req.cookies.password 
    account=req.cookies.account 
    infor="username = "+username+"<br/>" 
    infor+="password = "+password+"<br/>" 
    if(account!=null) 
    { 
    infor+="account.username = "+account.username+"<br/>" 
    infor+="account.password = "+account.password+"<br/>" 
    }     
    res.send(infor)     
}) 

var session = require('express-session'); 
app.use(session({secret: "Shh, its a secret!"})); 

app.get("/contact",cors(),(req,res)=>{ 
    if(req.session.visited!=null) 
    { 
        req.session.visited++ 
        res.send("You visited this page "+req.session.visited +" times") 
    } 
    else 
    { 
        req.session.visited=1 
        res.send("Welcome to this page for the first time!") 
    } 
}) 

// =============================================
// API 1: Lấy danh sách tất cả Product từ MongoDB
// =============================================
app.get("/products", cors(), async (req, res) => {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db("FashionData");
        const collection = db.collection("Product");
        const data = await collection.find({}).toArray();
        res.json(data);
        client.close();
    } catch (err) {
        res.json({ error: err.message });
    }
})

// =============================================
// API 2: Thêm 1 sản phẩm vào giỏ hàng (Session)
// =============================================
app.post("/cart/add", cors(), (req, res) => {
    const product = req.body; // Nhận product từ Angular gửi lên

    // Nếu giỏ hàng chưa tồn tại trong session thì tạo mảng rỗng
    if (req.session.cart == null) {
        req.session.cart = [];
    }

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const index = req.session.cart.findIndex(
        item => item.ProductId === product.ProductId
    );

    if (index >= 0) {
        // Nếu đã có → tăng số lượng lên 1
        req.session.cart[index].quantity++;
    } else {
        // Nếu chưa có → thêm mới với quantity = 1
        product.quantity = 1;
        req.session.cart.push(product);
    }

    res.json({ message: "Added to cart!", cart: req.session.cart });
})

// =============================================
// API 3: Xem giỏ hàng hiện tại
// =============================================
app.get("/cart", cors(), (req, res) => {
    // Nếu chưa có giỏ hàng thì trả về mảng rỗng
    if (req.session.cart == null) {
        res.json([]);
    } else {
        res.json(req.session.cart);
    }
})

// =============================================
// API 4: Xóa 1 sản phẩm khỏi giỏ hàng
// =============================================
app.post("/cart/remove", cors(), (req, res) => {
    const productId = req.body.ProductId;

    if (req.session.cart != null) {
        // Lọc ra những sản phẩm KHÔNG phải sản phẩm cần xóa
        req.session.cart = req.session.cart.filter(
            item => item.ProductId !== productId
        );
    }

    res.json({ message: "Removed!", cart: req.session.cart });
})

// =============================================
// API 5: Cập nhật số lượng sản phẩm trong giỏ
// =============================================
app.post("/cart/update", cors(), (req, res) => {
    const { ProductId, quantity } = req.body;

    if (req.session.cart != null) {
        const index = req.session.cart.findIndex(
            item => item.ProductId === ProductId
        );
        if (index >= 0) {
            req.session.cart[index].quantity = quantity;
        }
    }

    res.json({ message: "Updated!", cart: req.session.cart });
})
