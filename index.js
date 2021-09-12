import { request } from "../requestV2";


import { Setting, SettingsObject } from "../SettingsManager/SettingsManager";

var setting = new SettingsObject("SkyblockAuctionFlipper", [
    {
        name: "Main",
        settings: [
            new Setting.Toggle("Enabled", true),
            new Setting.TextInput("Flip Minimum (currently disabled)", "0"),
        ]
    }
]);

setting.setCommand("afsettings").setSize(200, 20);
Setting.register(setting);






i = 0;
it_no = 0;
auctions = null;

found = 0


register("tick", ticker);
function ticker() {



  i++;
  if (i > 600 && found === 0 && setting.getSetting("Main", "Enabled") === true) {
    i = 0;
    request({
      url: "https://auction-destroyer.herokuapp.com/",
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
          ChatLib.clearChat(5052);
        } catch (e) {}
        //if ((auc.average_price - auc.price) > parseInt(setting.getSetting("Main", "Flip Minimum").value)) {
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
        new Message(new TextComponent("&l&4[Next]").setClick("run_command", `/af`))
          .setChatLineId(5052)
          .chat();

        it_no = Math.floor(Math.random() * auctions.length);
//}else{
  //ChatLib.chat(parseInt(setting.getSetting("Main", "Flip Minimum").value))
//}
      } catch (e) {
        //ChatLib.chat(response.toString());
      }
    });
  }
}

register("command", changer).setName("af");


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
    new Message(new TextComponent("&l&4[Next]").setClick("run_command", `/af`))
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
