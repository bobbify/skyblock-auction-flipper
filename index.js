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
  lines = []
found = 0
  function arrayContains(needle, arrhaystack)
  {
      return (arrhaystack.indexOf(needle) > -1);
  }

register("tick", ticker);
function ticker() {

  Scoreboard.getLines().forEach((item, i) => {
    lines.push(ChatLib.removeFormatting(item).replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, ''))
  });


  i++;
  if (i > 600 && found === 0 && arrayContains("  BarackObama1961's Island",lines) && setting.getSetting("Main", "Enabled") === true) {
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
  if (arrayContains("  BarackObama1961's Island",lines)) {
  found = 0
}else{
  ChatLib.chat('Limiting usage due to testing of new features, /visit BarackObama1961 in order to use the flipper.')
}

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
