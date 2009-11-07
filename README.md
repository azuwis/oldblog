Google custom search

1. Go to http://www.google.com/cse/ create a custom search.
2. Choose "Only sites I select" in "What do you want to search?".
3. Add site url in "Sites to search", eg: "your.site.com/*".
4. Go to control panel, find search engine unique ID, fill it to _config.yml.
5. In control panel -> indexing -> On-demand indexing using Sitemaps, choose the sitemap, see below.

Google webmaster
1. Go to http://www.google.com/webmasters/tools/ and add the site.
2. Find the verification code, fill it to _config.yml.
3. Generate the contents, and upload to server.
4. Verify the site.
5. In site configuration -> sitemaps, add "atom.xml" as the sitemap.
6. When the sitemap status is OK, return to Google custom search step 5.
