let apiQuotes = [];

// Get quotes from API: type.fit/api/quotes
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      console.log(apiQuotes[12]);
    } catch (error) {
      // Catch Error Here
    }
  }

// on load of webpage
getQuotes();