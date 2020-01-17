gatsby-transformer-obfuscator
-----

> Obfuscate plain text into unreadable text.

[![Build Status](https://travis-ci.com/Jeff-Tian/gatsby-transformer-obfuscator.svg?branch=master)](https://travis-ci.com/Jeff-Tian/gatsby-transformer-obfuscator)

# Installation
```bash
npm i --save gatsby-transformer-obfuscator
```

**Note:** You also need to have `gatsby-source-filesystem` installed and configured so it points to your files.

# How to use
In your `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
```

Where the source folder `./src/data/` contains the text files.
