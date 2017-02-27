// Instructions
Requirements: Node v6.10.0 or higher
Optional Method using NVM to install node:
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps

// Download and install nvm, npm, and node:
curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
source ~/.profile
nvm ls-remote
nvm install 6.10.0

then check:
node --version
npm --version

// Bot installation:
go to folder that contains index.js and package.json
install the following packages with the following commands:
npm install discord.js
npm install request
npm install cheerio
npm install fs
npm install tosource
npm install jquery

// To run, go to the folder containing index.js, then type the following:
node index.js

