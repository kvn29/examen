var mongoose = require('mongoose');
var Hotel = mongoose.model('hotel');

module.exports.postAddComment = (req, res) => {
  var hotelID = req.params.hotelID;

  Hotel
    .findById(hotelID)
    .select('reviews')
    .exec((err, hotel) => {
      if(err) {
        console.log('Hotel introuvable');
        res.status(500).json(err);
      }
      else if(!hotel) {
        console.log('Hotel introuvable');
        res.status(404).json({
          "message": "Hotel introuvable"
        });
      }
      else {
        hotel.reviews.push({
          name : req.body.name,
          rating : parseInt(req.body.rating, 10),
          review : req.body.commentaire
        });
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
          }
        });
      }
    });

};


module.exports.getAllHotel = (req, res) => {
  Hotel
    .find()
    .exec((err, hotel) => {
        if(err) {
          console.log('Hotel introuvable');
          res.status(500).json(err);
        } else {
          console.log('Hotel trouvé');
          res.json(hotel);
        }
    });
};

module.exports.getOneHotel = (req, res) => {
  var hotelID = req.params.hotelID;

  Hotel
    .findById(hotelID)
    .exec((err, hotel) => {
      if(err) {
        console.log('Hotel introuvable');
        res.status(500).json(err);
      }
      else {
        console.log('Hotel trouvé');
        res.json(hotel);
      }
    });
};
