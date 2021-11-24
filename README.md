<!-- ABOUT THE PROJECT -->
## About Text Search Engine

The goal of this project is to build a text search engine. The app is used to search a set of documents for the given search term or phrase (single token), and 
return results in order of relevance. Relevancy is defined as number of times the exact term or phrase
appears in thedocument. 

Text files are loaded to Nodejs using Streams. One big advantage is that using streams is there is no
limit on file size since file is loaded line by line.


There are three methods for searching the documents:
1. Simple string matching
2. Text search using regular expressions
3. Preprocess the content and then search the index

You can try deployed version [Text Search App](https://text-search-engine.herokuapp.com/)

### Built With

* [Node.js](https://nodejs.org/en/)
* [React.js](https://reactjs.org/)


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g

  Node version >= 16.0

  ```

### Installation

_To get started with developement._

1. Clone the repo
   ```sh
   git clone https://github.com/Yangani/search-engine.git
   ```
2. Install Dependencies
   ```sh
   yarn
   ```
3. Run local dev environment
   ```sh
   yarn dev
   ```
App will build both the Nodejs and React apps
Serverwill run port 3030 while client runs in port 3000

Client will automaticall launch in you default browser. 
You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.


The page will reload if you make edits.
You will also see any lint errors in the console.
### Run performance Tests

`yarn test`

Launches the test runner in the interactive watch mode.

### Build and Deploy

`yarn build`


Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
### Results

Which was the best search?

Indexed search was by far the fasted search. Before we answer why. One may wonder isn't it just easy to have a loop that checks if every document 
contains the word they are searching? While that is possible, it is not always a great idea. The time complexity in this case will be linear, since
we have to check each and every word in the document. Thus this will not be ideal if you are dealing with very large files.

For the app. Indexed search was by far the fasted search. There was no significant difference in search perfomance between simple search and Regex.
Both were slower than indexed since their search is linear. To make search text faster, one needs preprocess the text and build an index in advance.

In order to further enhance perfomance one can: 

* Tokenization: breaking strings into words differently across languages
* Stemming: e.g caring for time matches results for care for time
* Stopword handling: avoid irrelevant results caused by common words such as a and the
* Wrapping OS calls - To take advantage of native OS processing
* Sort results by relevance.
* Increasing CPU and memory
* Caching common searches

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
