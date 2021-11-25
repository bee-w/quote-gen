const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let allQuotes = [];

// Loader
function addLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Finished Loading
function removeLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get quotes from API
function newQuote() {
    addLoader();
    const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
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
    removeLoader();
}

// Try API, back up from local file
async function getQuotes() {
    addLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      allQuotes = await response.json();
      newQuote();
    } catch (error) {
        allQuotes = localQuotes;
        newQuote();
        console.log("error with API");
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