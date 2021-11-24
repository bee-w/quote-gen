let apiQuotes = [];

// Get quotes from API: type.fit/api/quotes
async function getQuotes() {
    const apiUrl = 'type.fit/api/quotes';
    try {
        // await so that fetched only after data loaded
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
    } catch (error) {
        // catch error
    }
}

// on load of webpage
getQuotes();