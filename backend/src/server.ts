import 'dotenv/config';
import app from './app.mjs';

const port = Number(process.env.API_PORT ?? 3001);
app.listen(port, () => {
  console.log(`Fashion API listening on http://localhost:${port}`);
});
