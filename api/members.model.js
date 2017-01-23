var mongoose = require('mongoose');

var membersSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true
  },
  motdepasse: {
    type: String,
    required : true
  }
});

mongoose.model('members', membersSchema, 'members');
