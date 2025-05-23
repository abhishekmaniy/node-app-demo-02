import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Hello From node demo 2");
});

app.get("/about", (req, res) => {
    res.send("Hello From node demo 2 about page");
});

app.listen(3000, () => {
    console.log("app is Running on port 3000")
})