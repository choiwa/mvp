const express = require("express");
const app = express();
const path = require("path");
const getPhotosURLs = require('./getPhotos.js');
// const Flickr = require("flickrapi"),
//     flickrOptions = {
//       api_key: "18ed4a6bd0cde708a07fc886fb2e0d88",
//       secret: "7b40def4a33d529e",
//       requestOptions: {
//         timeout: 20000,
//       }
//     };
var photos = 'im photos'

// app.use(bodyParser.json());
// app.use(bod)



app.use(express.static(path.join(__dirname, "/../public/dist")));


app.get("/api/photos", (req, res) => {
  console.log('inside get request')
  getPhotosURLs((err, result) => {
    if (err) {
      console.log(err);
    } else {
        res.send(result.photos.photo);
    }
  });
});

app.listen(3000, console.log("listing on port 3000"));
