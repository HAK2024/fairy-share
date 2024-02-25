import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
