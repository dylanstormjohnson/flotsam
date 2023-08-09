import mongoose from "mongoose";

console.log(process.env.MONGODB_URI);
mongoose.connect(
  "mongodb+srv://noemicouch:12345678Noemi@cluster0.a0j1vlm.mongodb.net/?retryWrites=true&w=majority"
  // process.env.MONGODB_URI //|| "mongodb://127.0.0.1:27017/flotsam"
);

export default mongoose.connection;
