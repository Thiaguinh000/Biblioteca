const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocumentsSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  genre: { type: String, required: true, maxLength: 100 },
  date_of_register: { type: Date },
});

// Virtual for documents's URL
DocumentsSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/documents/${this._id}`;
});

// Export model
module.exports = mongoose.model("Documents", DocumentsSchema);