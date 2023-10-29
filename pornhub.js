// Import necessary modules
const request = require('request');
const cheerio = require('cheerio');

// Define the URL to scrape
const url = 'https://www.pornhub.com';

// Create the plugin
const myScraperPlugin = {
  // Define the plugin name and description
  name: 'Web Link Scraper',
  description: 'Scrape links from a webpage',

  // Define the plugin function to be executed
  execute: function (config, callback) {
    // Send a GET request to the specified URL
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        // Load the HTML content into Cheerio
        const $ = cheerio.load(html);

        // Find and collect links
        const links = [];
        $('a').each((index, element) => {
          links.push($(element).attr('href'));
        });

        // Log the links to the console
        console.log(links);

        // Return the links to the callback function
        callback(null, links);
      } else {
        callback('Failed to retrieve the webpage', null);
      }
    });
  },
};

// Export the plugin
module.exports = myScraperPlugin;
