#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, documentss and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Documents = require("./models/documents");

const documents = [];

const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createDocuments();
  console.log("Debug: Closing mongoose");
  await mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// documents[0] will always be the Fantasy documents, regardless of the order
// in which the elements of promise.all's argument complete.
async function documentsCreate(index, name, genre, date_of_register) {
  const documentsdetail = {
    name,
    genre,
    date_of_register
  }
  const document = new Documents(documentsdetail);
  await document.save();
  documents[index] = document;
  console.log(`Added documents: ${name}`);
}

async function createDocuments() {
  console.log("Adding documents");
  await Promise.all([
    documentsCreate(0, "Jornal", "municipal", "2025/04/23"),
    documentsCreate(1, "carta", "governamental", "2023/03/18"),
    documentsCreate(2, "conta", "de energia", "2024/04/03"),
  ]);
}
