import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached= (global as any).mongoose || {conn: null, promise: null} 
//checks if its in global a mongodb connection if not create new object n store

async function dbConnect(){

    if (cached.conn) {
    return cached.conn;
  }
  // if we connected before just return it right away

  if (!cached.promise) { //this is a connection ticket saying its in progress if not no one has tried to conn before
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    }).then((mongoose) => mongoose);
    //Save that promise into cached.promise (so if another request comes in while we’re still connecting, it can reuse the same promise instead of making a second connection).
  }

   cached.conn = await cached.promise;
  return cached.conn;

}

export default dbConnect;