/* eslint no-plusplus: "off" */

class RequestRateLimiter {
  /**
         * send rate limited requests
         *
         * @param <number> no of allowed request
         * @param <number> seconds to perform requests
         *
         */
  constructor(limit, interval) {
    this.limit = limit || 60;
    this.interval = interval || 3600;
    this.tokens = []; // empty token bucket
  }

  // Each request goimg through should be added to token with timestamp of request

  middleware(req, res, next) {
    this.tokens.push({ method: req.method, at: Date.now() });
    this.handleLimiting(req, res, next, this.tokens);
  }

  fetchTokens(pastMilliseconds) {
    this.tokens.filter(token => token.at > Date.now() - pastMilliseconds);
  }

  handleLimiting(req, res, next, tokens) {
    for (let i = 0; i < tokens.length; i++) {
      const maximumLimit = this.limit;
      const matchingTokens = this.fetchTokens(tokens, this.interval * 1000);
      if (matchingTokens.length > maximumLimit) {
        res.status(429).send(`Rate limit exceeded. Try again in ${this.calculateRetrySeconds(tokens[i], tokens.indexOf(tokens[i]))} seconds`);
        return;
      }
      next();
    }
  }

  calculateRetrySeconds(element, indexOfElement) {
    const index = this.tokens.findIndex(indexOfElement - this.limit);
    return ((index.at + this.interval) - element.at) / 1000;
  }
}

export default RequestRateLimiter;
