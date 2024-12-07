import express, { text } from "express";
import path from "path";
import articleRouter from "./router/index.js";
import { articles, createSlug} from "./data/articles.js";
import methodOverride from 'method-override';
//import bodyParser from 'body-parser';

const app = express();
const __dirname = path.resolve();


// Helper function to calculate time ago
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/articles", articleRouter);


app.get("/", (req, res) => {
  res.render("articles/index", { articles: articles , timeAgo: timeAgo});
});

app.listen(3000);
