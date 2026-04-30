// Load environment variables from .env before the rest of the app starts
import "dotenv/config";

import app from "./app";

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`TruWork API running on port ${PORT}`);
});