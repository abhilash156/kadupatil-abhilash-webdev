var mongoose = require("mongoose");

var widgetSchema = mongoose.Schema({
    _page: [{type : mongoose.Schema.ObjectId, ref: "PageModel"}],
    type: String enum? ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'],
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "widget"});

modules.exports = widgetSchema;