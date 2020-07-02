## Pew Article Scrapper

An **MVC** designed Full Stack Application scraping the PEW Research Website.

Enables user to scrape the lastest Pew Research Center Articles focused in America. Users can save articles for future reading. Once an article is saved, the user can compile personal notes on the article.

## Tech Used
* JavaScript
* jQuery
* Node.js
  * Axios
  * Express
  * Express-Handlebars
  * Cheerio
* HTML
* CSS
* Bootstrap
* MongoDB

## Instructions
1. Access the [Pew Article Scrapper Homepage](https://gentle-ocean-77475.herokuapp.com/articles)
1. On the `HomePage`, users are presented with snippets of Pew Research Articles focused in the United States.
![Article](/images/articleStart.gif)
   1. The **Clear Articles** button, will remove any currently loaded articles.
   1. Use the **Scrape New Articles** button to be presented with updated article snippets from the Pew Research Center.
   
1. For any article, click on the
   1. title to see the full article.
   1. save article button to save the article to read later.
1. In the Nav bar, click on **Saved Articles** to see snippets of any articles you have previously saved.
1. On the `Saved Articles` page, click on the
   1. **Delete from Saved** button to completely remove the article from your list.
   1. **Article Notes** button to write a note on the article.  The Article Notes modal will keep all saved notes, and allow you to delete any previous notes.
   1. title to see the full article.
