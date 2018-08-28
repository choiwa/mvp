const express = require("express");
const app = express();
const path = require("path");
const getPhotosURLs = require('./getPhotos.js');
const bodyParser = require('body-parser');

var photos = 'im photos'

app.use(express.static(path.join(__dirname, "/../public/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/photos", (req, res) => {
  console.log('inside get request')
  getPhotosURLs((err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result.photos);
        res.send(result.photos.photo);
    }
  });
});

app.post("/popularSearch", (req, res) => {
  console.log(req.body);
})

app.listen(3000, console.log("listing on port 3000"));
