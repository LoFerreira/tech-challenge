import mongoose from "mongoose";

const uri =
  "mongodb+srv://leonardo10sp:atmgdtdt66@alura.14fliwi.mongodb.net/alura-node?";

mongoose.connect(uri);

const db = mongoose.connection;

export default db;
