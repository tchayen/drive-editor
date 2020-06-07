const fs = require("fs");

const clientId = process.env.CLIENT_ID;
const apiKey = process.env.API_KEY;

const data = `{
  "clientId": "${clientId}",
  "apiKey": "${apiKey}"
}
`;

fs.writeFileSync("src/config.json", data);
