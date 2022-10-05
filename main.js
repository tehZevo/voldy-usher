var Eris = require("eris");
var protopost = require("protopost").client;

var HOST = process.env["VOLDY_HOST"];

async function PREDICT(prompt)
{
  var request = {"fn_index":3,"data":[prompt,"","None",20,"Euler a",true,false,1,1,7,-1,-1,0,0,0,512,512,"None",null,false,"Seed","","Steps","",[],"",""],"session_hash":"4nn9ggqy6b9"}
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
