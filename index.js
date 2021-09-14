import { request } from "../requestV2";

function openAh() {
  ChatLib.command(`viewauction ${auc.seller}`)
}
import { Setting, SettingsObject } from "../SettingsManager/SettingsManager";
auc = NaN
var setting = new SettingsObject("SkyblockAuctionFlipper", [
    {
      name: "Information",
      settings: [
          new Setting.Button("&e&lSkyblockAuctionFlipper", "Ver 0.1.0", () => {}),
          new Setting.Button("&rThis mod is still in development.", "", () => {}),
          new Setting.Button("", "", () => {}),
          new Setting.Button("If you have any issues you can contact me via discord:", "deandre#3930", () => {}),
          new Setting.Button("", "", () => {}),
          new Setting.Button("&lHow to use:", "", () => {}),
          new Setting.Button("Chat messages will appear with the items that are considered flips, due to being lower", "", () => {}),
          new Setting.Button("in value then usual selling price. When these messages appear you can click to go to the auction", "", () => {}),
          new Setting.Button("To adjust how much you want to make in profit from these flips go to main in the settings menu.", "", () => {}),
      ]},{
        name: "Settings",
        settings: [
            new Setting.Toggle("Enable Mod", true),
            new Setting.TextInput("Refresh Rate", "600"),
            new Setting.TextInput("Flip Minimum", "0"),
            new Setting.TextInput("Item price maximum (don't change if you don't want a cap on price)", "1000000000000"),
            new Setting.Button("", "", () => {}),
            new Setting.Button("&lMost Recent Item: (This feature is still in development)", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("No item in cache yet ☹", "", () => {}),
            new Setting.Button("Waiting for the next items to be recieved...", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "&4&lReset Settings", function() {
                //setting.reset();
                //setting.load();
            })
        ]},
        {
        name: "Flip GUI",
        settings: [
            new Setting.Button("This feature is experimental, any feedback welcome.", "", () => {}),
            new Setting.Toggle("Enabled", false),
            new Setting.Button("", "&l&2[To Auction]", function() {
try{
openAh()
}catch(e){}
            }),
            new Setting.Button("", "&l&4[Next]", function() {
              try{
              auctionRoute()
            }catch(e){}
            }),
        ]
    },
        {
        name: "Extras",
        settings: [
            new Setting.TextInput("Key: (Don't touch this!)", "Ldp9xUHrMi"),
        ]
    }
]);

setting.setCommand("afsettings").setSize(600, 200);
Setting.register(setting);






i = 0;
it_no = 0;
auctions = null;

found = 0

register("renderOverlay", myRenderOverlay);

function myRenderOverlay() {
  if (setting.gui.isOpen() && setting.getSetting("Flip GUI", "Enabled") === true) {
    try{
  Renderer.drawString('&l&e Item: ' + auc.name, Renderer.screen.getWidth()/2 - 200, Renderer.screen.getHeight()/2 - 65);
  Renderer.drawString('&l&e Price: $' + numberWithCommas(auc.price), Renderer.screen.getWidth()/2 - 200, Renderer.screen.getHeight()/2 - 55);
  Renderer.drawString('&l&e Average: $' + numberWithCommas(auc.average_price), Renderer.screen.getWidth()/2 - 200, Renderer.screen.getHeight()/2 - 45);
}catch(e){}
}
}

register("tick", ticker);
function ticker() {
rr = 600
if (parseInt(setting.getSetting("Settings", "Refresh Rate")) > 100) {
rr = parseInt(setting.getSetting("Settings", "Refresh Rate"))
}

  i++;
  if (i > rr && found === 0 && setting.getSetting("Settings", "Enable Mod") === true) {
    i = 0;
    request({
      url: `https://auction-destroyer.herokuapp.com/${setting.getSetting("Extras", "Key: (Don't touch this!)")}`,
      json: true,
      connectTimeout: 1000,
    }).then(function (response) {
      auctions = response;
      found = 1
      try {
        auc = auctions[it_no];
        try {
          ChatLib.clearChat(5050);
          ChatLib.clearChat(5051);
        } catch (e) {}

        if ((auc.average_price - auc.price) > parseInt(setting.getSetting("Settings", "Flip Minimum")) && auc.price < parseInt(setting.getSetting("Settings", "Item price maximum (don't change if you don't want a cap on price)"))) {
        new Message(
          new TextComponent(
            `&l&f${auc.name} &r| &6Avg: $${numberWithCommas(
              auc.average_price
            )}&r| &6Price: $${numberWithCommas(auc.price)}`
          )
        )
          .setChatLineId(5050)
          .chat();
        new Message(
          new TextComponent("&l&2[To Auction] ").setClick(
            "run_command",
            `/viewauction ${auc.seller}`
          )
        )
          .setChatLineId(5051)
          .chat();

        it_no = Math.floor(Math.random() * auctions.length);
}else{
}
      } catch (e) {
        //ChatLib.chat(response.toString());
      }
    });
  }
}

register("command", auctionRoute).setName("af");


function changer() {
  found = 0
}
function auctionRoute() {
  try {
    auc = auctions[it_no];
    try {
      ChatLib.clearChat(5050);
      ChatLib.clearChat(5051);
      ChatLib.clearChat(5052);
    } catch (e) {}
    new Message(
      new TextComponent(
        `&l&f${auc.name} &r| &6Avg: $${numberWithCommas(
          auc.average_price
        )}&r| &6Price: $${numberWithCommas(auc.price)}`
      )
    )
      .setChatLineId(5050)
      .chat();
    new Message(
      new TextComponent("&l&2[To Auction] ").setClick(
        "run_command",
        `/viewauction ${auc.seller}`
      )
    )
      .setChatLineId(5051)
      .chat();
      new Message(
        new TextComponent("&l&4[Next] ").setClick(
          "run_command",
          `/af`
        )
      )
        .setChatLineId(5052)
        .chat();

    it_no = Math.floor(Math.random() * auctions.length);
  } catch (e) {
    ChatLib.chat('No Auction Flips Found');
  }
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
