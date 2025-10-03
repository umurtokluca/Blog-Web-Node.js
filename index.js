import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/submit", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  posts.push({ title, content });
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);

  if (!isNaN(postId) && postId >= 0 && postId < posts.length) {
    posts.splice(postId, 1);
  }

  res.redirect("/");
});

// Edit sayfası (formu göstermek için)
app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts[postId];

  if (!post) {
    return res.redirect("/");
  }

  res.render("edit.ejs", { post, postId });
});

// Edit işlemi (form gönderilince güncelleme)
app.post("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);

  console.log("Edit route çalıştı:", postId, req.body);

  if (posts[postId]) {
    posts[postId].title = req.body.title;
    posts[postId].content = req.body.content;
    console.log("Güncellendi:", posts[postId]);
  }

  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
