import express from "express";
import { addVideo, getVideo, like, dislike } from "./dbfunctions.js";
const app = express();
const port = 5001;


app.get("/getvideo", async (req, res) => {
  const ans = await getVideo(req.query.videoId);
  if (ans === null) res.send({ likes: 0, dislikes: 0 });
  else res.send(ans.data());
});

app.post("/add", (req, res) => {
  addVideo(req.query.videoId);
  res.send("success");
});

app.post("/like", (req, res) => {
  like(req.query.videoId);
  res.send("success");
});

app.post("/dislike", (req, res) => {
  dislike(req.query.videoId);
  res.send("success");
});

/**
 * Start listening to port set above
 */
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
