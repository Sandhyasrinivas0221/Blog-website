import express from "express";
import { articles, createSlug } from "../data/articles.js";
import { marked } from "marked";
import methodOverride from 'method-override';
//import slugify from 'slugify';

const router = express.Router();
router.use(methodOverride('_method'));

//save article


router.get("/new", (req, res) => {
    const article ={}
  res.render("articles/new", { article: article});
});

// Route to Edit the article using slug

router.get("/edit/:slug", (req, res) => {
     const article = articles.find(a => a.slug === req.params.slug); 
     if (article) { 
        res.render('articles/edit', { article: article}); 
    } else { 
        res.status(404).send('Article not found')
    };
});


// Middleware to create or update an article
router.post( "/",(req, res, next) => {
    req.article = {};
    next();
  },
  saveAndEdit('new')
);

router.put("/:slug",(req, res, next) => {
    const article = articles.find((a) => a.slug === req.params.slug);
    req.article = article || {};
    next();
  },
  saveAndEdit('edit')
);

// Route to fetch and display an article by ID
router.get("/:slug", (req, res) => {
  const article = articles.find((a) => a.slug === req.params.slug);
  if (article) {
    article.htmlContent = marked(article.markDown);
    res.render("articles/view", { article: article });
  } else {
    res.status(404).send('<h1 style="text-align: center;">404 - Article Not Found</h1>');
  }
});

//Router to Delete article using slug

router.delete("/:slug", (req, res) => {
  const articleIndex = articles.findIndex((a) => a.slug === req.params.slug);
  if (articleIndex !== -1) {
    articles.splice(articleIndex, 1);
    res.redirect("/");
    // console.log('Deleted Article:', req.params.slug);
    //  res.status(200).send('Article deleted');
  } else {
    res.status(404).send('<h1 style="text-align: center;">404 - Article Not Found</h1>');
  }
});


function saveAndEdit(path) {
  return (req, res) => {
      let article = req.article;
      const { title, description, markDown } = req.body;

      // Server-side validation to check if title is not empty
      if (!title.trim()) {
          return res.render(`articles/${path}`, {
              errorMessage: 'Title is required',
              title,
              description,
              markDown
          });
      }

      article.title = title.trim();
      article.description = description;
      article.markDown = markDown; // Store raw markdown content
      // Standardize title for comparison
      const lowerTitle = title.trim().toLowerCase();

      // Check if the article title already exists
      const existingArticle = articles.find(a => a.title.trim().toLowerCase() === lowerTitle && a.id !== article.id);

      if (existingArticle) {
          return res.render(`articles/${path}`, {
              errorMessage: 'Title already exists',
              article: article  // Pass the entire article object to avoid losing data
          });
      }

      article.slug = createSlug(article.title);

      if (!article.id) {
          // If creating a new article
          article.id = articles.length + 1;
          article.date = new Date();
          articles.push(article);
      }

      res.redirect(`/articles/${article.slug}`);
  }
}


export default router;
