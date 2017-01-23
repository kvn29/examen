var express = require('express');
var router = express.Router();

var ctrlHotel = require('./controllers/hotel.controllers.js');

router.route('/hotel').get(ctrlHotel.getAllHotel);

router
  .route('/hotel/:hotelID')
  .get(ctrlHotel.getOneHotel)
  .post(ctrlHotel.postAddComment);

module.exports = router;
