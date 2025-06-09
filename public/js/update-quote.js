import { getData } from './ajax.js';

const apiUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

/**
 * Chooses the longer fact
 * @param {*} fact1 
 * @param {*} fact2 
 * @returns the longest fact
 */
const chooseBestFact = (fact1, fact2) => {
  if (fact1?.text && fact2?.text) {
    return fact1.text.length >= fact2.text.length ? fact1.text : fact2.text;
  } else if (fact1?.text) {
    return fact1.text;
  } else if (fact2?.text) {
    return fact2.text;
  } else {
    console.error('Both fetches failed:', fact1?.error, fact2?.error);
    return "Erm... I think I have brainfog.";
  }
};

const updateQuote = async () => {
  try {
    // Fetch two facts at once
    const [fact1, fact2] = await Promise.all([
      getData(apiUrl),
      getData(apiUrl)
    ]);

    const bestFact = chooseBestFact(fact1, fact2);

    const quoteElement = document.getElementById('quote-text');
    if (quoteElement) {
      quoteElement.textContent = bestFact;
    }
  } catch (err) {
    console.error('Error fetching quotes:', err);
  }
};

// Run once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateQuote();
  setInterval(updateQuote, 5000);
});
