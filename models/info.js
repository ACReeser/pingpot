var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var InfoSchema   = new Schema({
	elevenses: Boolean
});

module.exports = mongoose.model('Info', InfoSchema);
