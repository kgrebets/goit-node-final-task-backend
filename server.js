import "dotenv/config";
import app from "./app.js";
import connectDatabase from "./db/connectDatabase.js";

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
