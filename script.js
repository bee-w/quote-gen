const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loader
function getLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Finished Loading
function gotLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get quotes from API
function newQuote() {
    getLoader();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unkown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    gotLoader();
}

// Try API, back up from local file
async function getQuotes() {
    getLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
        const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        if (!quote.author) {
            authorText.textContent = 'Unkown';
        } else {
            authorText.textContent = quote.author;
        }

        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.textContent = quote.text;
        console.log("error with API")
    }
  }

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Webpage load
getQuotes();