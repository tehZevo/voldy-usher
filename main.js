require('dotenv').config();
var Eris = require("eris");
var protopost = require("protopost").client;

var HOST = process.env["VOLDY_HOST"];

async function PREDICT(prompt)
{
  var request = {
      "fn_index": 11,
      "data": [
          prompt,
          "",
          "None",
          "None",
          20,
          "Euler a",
          true,
          false,
          1,
          1,
          7,
          -1,
          -1,
          0,
          0,
          0,
          false,
          512,
          512,
          false,
          false,
          0.7,
          "None",
          false,
          false,
          null,
          "",
          "Seed",
          "",
          "Steps",
          "",
          true,
          false,
          null,
          ""
      ],
      "session_hash": "ueym2xe0vye"
  };
  var response = await protopost(`${HOST}/api/predict`, request);
  return response.data[0][0];
}

const bot = new Eris(process.env["DISCORD_TOKEN"]);

bot.on("ready", () => {
  console.log("Ready!");
});

bot.on("messageCreate", async (msg) => {
  if(msg.content.startsWith("!predict"))
  {
    var prompt = msg.content.slice("!predict".length).trim();
    var image = await PREDICT(prompt);
    const buf = new Buffer.from(image.split(",")[1], "base64");
    msg.channel.createMessage(`> ${prompt}`, {file: buf, name:"generated.png"});
  }
});

bot.connect();
