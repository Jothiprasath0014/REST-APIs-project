import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "352c8736-f588-4fd7-b07f-9b72ca3cd6e9";

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

// axios documentation.
// https://axios-http.com/docs/post_example

// Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.render("index.ejs", {content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try{
    const result = await axios.put(API_URL + "/secrets/" + searchId, req.body, config);
    res.render("index.ejs", {content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", {content: JSON.stringify(error.response.data)});
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(API_URL + "/secrets/" + searchId, req.body, config);
    res.render("index.ejs", {content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", {content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", {content: JSON(result.data) });
  } catch (error) {
    res.render("index.ejs", {content: JSON.stringify(response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
