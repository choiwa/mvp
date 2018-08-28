getPhotosURLs = (callback) => {
const Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "18ed4a6bd0cde708a07fc886fb2e0d88",
      secret: "7b40def4a33d529e",
      requestOptions: {
        timeout: 20000,
      }
    };

    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
      flickr.people.getPhotos({
        api_key: "18ed4a6bd0cde708a07fc886fb2e0d88",
        user_id: "164138503@N04",
        page: 1,
        per_page: 100
      }, function(err, result) {
        // console.log("im getPhotos", result.photos.photo);

        for (let i = 0; i < result.photos.photo.length; i++) {
          var photoId = result.photos.photo[i].id;
          flickr.photos.getSizes({
            api_key: "18ed4a6bd0cde708a07fc886fb2e0d88",
            photo_id: photoId,
          }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result.sizes.size);
            }
          });
        }

                callback(err, result);

      });








    });
}

// getPhotosURLs((err, result)=> {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });


module.exports = getPhotosURLs;
