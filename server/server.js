const express = require("express");
const app = express();
const path = require("path");
const Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "18ed4a6bd0cde708a07fc886fb2e0d88",
      secret: "7b40def4a33d529e"
    };

// app.use(bodyParser.json());
// app.use(bod)
app.use(express.static(path.join(__dirname, "/../public/dist")));

app.get("/api/photos", (req, res) => {
  Flickr.authenticate(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object
    flickr.photos.search({
      user_id: flickr.options.user_id,
      page: 1,
      per_page: 500
    }, function(err, result) {
      var photos = result.photos.photo;
      var photoURLs = [];

      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];

        photoURLs.push(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
      }
    });
  });
  console.log(photoURLs);
  res.send(photoURLs);
});

app.listen(3000, console.log("listing on port 3000"));
