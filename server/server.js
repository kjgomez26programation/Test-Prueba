const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Initialize JSON Server database
const db = router.db;

server.post("/login", (req, res) => {
  // console.log("entro 1");
  const { email, password } = req.body;
  const user = db.get("users").find({ email, password }).value();
  // console.log("entro 2");
  if (user) {
    // console.log("entro 3");
    res.status(200).json({ message: "Login successful", user });
  } else {
    // console.log("entro 4");
    res.status(401).json({ message: "Invalid email or password" });
  }
});

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.id = Date.now();
  }
  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
