# Sentiment Analyzer for Hacker News API
This project provides a front-end to interact with a database built upon the [Hacker News API](https://github.com/HackerNews/API).

The entirety of the Hacker News API has been loaded into a Postgres database.  During run time, a search query provided by the user performs a RegEx-based search on the database for all instances of the search term.  For all results, a sentiment analyzer is invoked and the results are averaged per month for all months in Hacker News' history.  These results are visualized on the front end.

## API Notes
For a description of the API, see the GitHub link above.  Basically, every comment/article/poll/user in HN's existence has a unique ID that increments from 1 as it is created.  This forms the URL parameter that is accessed at https://hacker-news.firebaseio.com/v0/item/.  These unique IDs were passed to this URL during loading of the database.

## Database notes

A Postgres database was loaded with the loading routine.  The schema for the master table of API items is called `mastertable` and its schema is as follows:

| id | by | text | descendants | type | time | title | score | kids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

A second table holds a cache of previously-executed searches so that the considerable processing time of the sentiment analysis does not have to run.  The table title is `cached_results` with the following schema.

| id | query_string | labels | sentiment_data | frequency_data |
| --- | --- | --- | --- | --- |

## Server Notes
An express server routes client requests, executes sentiment analysis middleware, and serves responses.  Search queries are sent as POST requests with a JSON object on the request body with a key called `queryString` representing the search term(s).  The middleware first searches the cache table for the existence of the search term in the `query_string` field.  If no results are returned, the sentiment analyzing routine is run and the results of that are then stuck back in the `cache_results` table for future searches.

## Sentiment Analysis Notes
Sentiment analysis is performed the text fields of the SQL results.  A required package is needed to perform the analysis, [available on NPM](https://www.npmjs.com/package/sentiment).  The general idea is that each word is looked up in a dictionary of scores that measure the word's polarity, and the scores are averaged for the whole text block.  See the documentation for more details.

## Front End Notes
The front end is built in vanilla React, with chartJS, and momentJS for UX elements.
