import {
    request
} from "../requestV2";

function openAh() {
    ChatLib.command(`viewauction ${auc.seller}`)
}
import {
    Setting,
    SettingsObject
} from "../SettingsManager/SettingsManager";

/*import FlipGui from "./gui.js";*/

auc = NaN
var flipsetting = new SettingsObject("SkyblockAuctionFlipper", [{
        name: "Information",
        settings: [
            new Setting.Button("&5&lFlip&d&lFlop", "", () => {}),
            new Setting.Button("           &e&lSkyblockAuctionFlipper", "Ver 0.4.2", () => {}),
            new Setting.Button("&rThis mod is still in development.", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("If you have any issues you can contact me via discord:", "deandre#3930", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("&lHow to use:", "", () => {}),
            new Setting.Button("Chat messages will appear with the items that are considered flips, due to being lower", "", () => {}),
            new Setting.Button("in value then usual selling price. When these messages appear you can click to go to the auction", "", () => {}),
            new Setting.Button("To adjust how much you want to make in profit from these flips go to main in the settings menu.", "", () => {}),
        ]
    }, {
        name: "Settings",
        settings: [
            new Setting.Toggle("Enable Mod", true),
            new Setting.TextInput("Refresh Rate", "600"),
            new Setting.TextInput("Flip Minimum:", "0"),
            new Setting.TextInput("Item Price Maximum:", "Max"),
            new Setting.Toggle("Purse amount is Maximum:", false),
            new Setting.Toggle("Flip Warning:", false),
            new Setting.Toggle("Profit > Price Only:", false),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "&4&lReset Settings", function() {
                /*flipsetting.reset();
                flipsetting.load();
                print('Pressed')*/
            })
        ]
    },
    {
        name: "Exclusions",
        settings: [
            new Setting.Button("&l(This feature is still in development if you want another exclusion ask)", "", () => {}),
            new Setting.Toggle("Exclude Recombobulated:", false),
            new Setting.TextInput("Exclude Keywords:", "Furnace+, Experimentation Table"),
            new Setting.Button("", "", () => {}),

        ]
    },
    {
        name: "Extras",
        settings: [
            new Setting.TextInput("Key: (Don't touch this!)", "Ldp9xUHrMi"),
        ]
    }
]);

flipsetting.setCommand("afsettings").setSize(600, 200);
Setting.register(flipsetting);


i = 0;
it_no = Math.floor(Math.random() * 100);
it_roll = 0
auctions = null;
prev_i = []
found = 0

register("tick", ticker);

function Chatmsg(auc, isaf) {
  auc.name = (auc.name).replace(new RegExp("~", "g"), '&6✪')
  if (auc.name.split('VERY_SPECIAL')[1] == 'VERY_SPECIAL') {
    auc.name = '&c'+ auc.name.split('VERY_SPECIAL')[0]
    auc.rarity = '&c&l' + auc.rarity
    auc.rarformat = '&c&l'
  }
  if (auc.name.split('SPECIAL')[1] == 'SPECIAL') {
    auc.name = '&c'+ auc.name.split('SPECIAL')[0]
    auc.rarity = '&c&l' + auc.rarity
    auc.rarformat = '&c&l'
  }
  if (auc.name.split('MYTHIC')[1] == 'MYTHIC') {
    auc.name = '&d'+ auc.name.split('MYTHIC')[0]
    auc.rarity = '&d&l' + auc.rarity
    auc.rarformat = '&d&l'
  }
  if (auc.name.split('LEGENDARY')[1] == 'LEGENDARY') {
    auc.name = '&6'+ auc.name.split('LEGENDARY')[0]
    auc.rarity = '&6&l' + auc.rarity
    auc.rarformat = '&6&l'
  }
  if (auc.name.split('EPIC')[1] == 'EPIC') {
    auc.name = '&5'+ auc.name.split('EPIC')[0]
    auc.rarity = '&5&l' + auc.rarity
    auc.rarformat = '&5&l'
  }
  if (auc.name.split('RARE')[1] == 'RARE') {
    auc.name = '&9'+ auc.name.split('RARE')[0]
    auc.rarity = '&9&l' + auc.rarity
    auc.rarformat = '&9&l'
  }
  if (auc.name.split('UNCOMMON')[1] == 'UNCOMMON') {
    auc.name = '&2'+ auc.name.split('UNCOMMON')[0]
    auc.rarity = '&2&l' + auc.rarity
    auc.rarformat = '&2&l'
  }
  if (auc.name.split('COMMON')[1] == 'COMMON') {
    auc.name = '&f'+ auc.name.split('COMMON')[0]
    auc.rarity = '&f&l' + auc.rarity
    auc.rarformat = '&f&l'
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
function AdditionalInfo() {
  addition = ''
  if (auc.lore.includes('&k')) {
    addition+= `\n&r► ${auc.rarformat}&kg&r${auc.rarformat}RARITY UPGRADED&kg`
  }
  if (auc.extra.modifier) {
    addition+= `\n&r► ${capitalizeFirstLetter(auc.extra.modifier)} Reforge`
  }
  if (auc.extra.spider_kills) {
    addition+= `\n&r► ${nFormatter(auc.extra.spider_kills)} Spider Kills`
  }
  if (auc.extra.zombie_kills) {
    addition+= `\n&r► ${nFormatter(auc.extra.zombie_kills)} Zombie Kills`
  }
  if (auc.extra.hot_potato_count > 11) {
    addition+= `\n&r► ${nFormatter(auc.extra.hot_potato_count)} Potato Books`
  }
  if (auc.extra.hot_potato_count < 10) {
    addition+= `\n&r► ${nFormatter(auc.extra.hot_potato_count)}&♨ Potato Books`
  }
  if (auc.extra.dungeon_item_level) {
    addition+= `\n&r► &4${nFormatter(auc.extra.dungeon_item_level)}&r Dungeon Stars`
  }
  if (auc.extra.compact_blocks) {
    addition+= `\n&r► ${nFormatter(auc.extra.compact_blocks)} Blocks Mined`
  }
  if (auc.extra.ability_scroll) {
    for (let step = 0; step < auc.extra.ability_scroll.length; step++) {
    addition+= `\n&r► Ability Scroll: ${auc.extra.ability_scroll[step]}`
  }
  }

  return addition + `\n\n&f&lEnchantments: \n&4&lCOMING SOON`
}
if(auc.amount > 1)  {
  auc.name = auc.name + ' &f' + auc.amount + 'x'
}
                  new Message(
                    new TextComponent(
                        `&l&f${auc.name}`
      ).setHover("show_text", auc.name + '\n' + auc.lore),
                          new TextComponent(
                              `| &6Profit: $${nFormatter(
                (auc.average_price - auc.price),1
              )} &f| &6Price: $${nFormatter(auc.price,1
)}`).setHover("show_text", `&d&lFlip Stats:\n &r► &eCalculated Avg: &f$${nFormatter(auc.average_price,1)} \n &r► &ePrice: &f$${nFormatter(auc.price,1)} \n &r► &eTax: &f&4-$${nFormatter(auc.price/100,1)} \n &r► &eProfit: &a$${nFormatter((auc.average_price - auc.price) - (auc.price/100),1)} \n\n&r&lAdditional Stats:${AdditionalInfo()}\n\n${riskCalc(auc.average_price, auc.price)}`)
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
if (isaf == false) {
  new Message(
  new TextComponent("&l&4[Next] ").setClick(
      "run_command",
      `/af`
  )
  ).setChatLineId(5052)
  .chat();

  if (flipsetting.getSetting("Settings", "Flip Warning:") == true) {
    Client.showTitle('§lNew Auction', `§l§f${auc.name}`, 10, 10, 10)
    World.playSound('mob.irongolem.hit', 100, 10)
  }
}
if (isaf === true) {
new Message(
new TextComponent("&l&4[Next] ").setClick(
    "run_command",
    `/af`
)
).setChatLineId(5052)
.chat();
new Message(
    new TextComponent("&l&4[Prev] ").setClick(
        "run_command",
        `/afp`
    )
)
.setChatLineId(5053)
.chat();
}

}
function ticker() {

    rr = 600
    if (parseInt(flipsetting.getSetting("Settings", "Refresh Rate")) > 100) {
        rr = parseInt(flipsetting.getSetting("Settings", "Refresh Rate"))
    }
    i++;
    if (i > rr && flipsetting.getSetting("Settings", "Enable Mod") === true) {
        i = 0;
        exclusionsettings = 'false'
        request({
            url: `https://auction-destroyer.herokuapp.com/${flipsetting.getSetting("Extras", "Key: (Don't touch this!)")}`,
            json: true,
            connectTimeout: 1000,
        }).then(function(response) {
          if(response[0].name) {
            auctions = response;
          }

            found = 1
            try {
                auc = auctions[it_no];
                try {
                  ChatLib.clearChat(5050);
                  ChatLib.clearChat(5051);
                  ChatLib.clearChat(5052);
                  ChatLib.clearChat(5053);
                } catch (e) {}
auctionRoute()


            } catch (e) {
              new Message(new TextComponent(`No Auction Flips Found`).setHover("show_text", e)).chat()
            }
        });
    }
}

register("command", auctionRoute).setName("af");


function auctionRoute() {
    try {
      it_no = it_no+1
      if (it_no > auctions.length) {
        it_no = 0
      }
        auc = auctions[it_no];
        if ((auc.average_price - auc.price) < deFormat((flipsetting.getSetting("Settings", "Flip Minimum:")).toUpperCase())) {
          return auctionRoute()
        }
        if (flipsetting.getSetting("Settings", "Item Price Maximum:") == false) {
        if (!(flipsetting.getSetting("Settings", "Item Price Maximum:") == 'Max')) {
        if (auc.price > deFormat((flipsetting.getSetting("Settings", "Item Price Maximum:")).toUpperCase())) {
          return auctionRoute()
        }
      }
    }else {
      coins = ChatLib.removeFormatting(Scoreboard.getLines()[3])
      if(coins.includes("Purse:")) {
        if (coins.match(/\d/g).join("") < auc.price) {
        return auctionRoute()
      }
      }
    }
        if (flipsetting.getSetting("Settings", "Profit > Price Only:") == true) {
          if ((auc.average_price - auc.price) < auc.price) {
          return auctionRoute()
        }
        }
        if (flipsetting.getSetting("Exclusions", "Exclude Recombobulated:") == true && auc.extra.rarity_upgrades == 1) {
          return auctionRoute()
        }
        if (auc.name) {
                try {
                    ChatLib.clearChat(5050);
                    ChatLib.clearChat(5051);
                    ChatLib.clearChat(5052);
                    ChatLib.clearChat(5053);
                } catch (e) {}
Chatmsg(auc, true)
        }
    } catch (e) {
      new Message(new TextComponent(`No Auction Flips Found`).setHover("show_text", e)).chat()
    }
}
register("command", auctionRoutep).setName("afp");

function auctionRoutep() {
    try {
      it_no = it_no-1
      if (it_no < 1) {
        it_no = auctions.length
      }
        auc = auctions[it_no];
        if ((auc.average_price - auc.price) < deFormat((flipsetting.getSetting("Settings", "Flip Minimum:")).toUpperCase())) {
          return auctionRoutep()
        }
        if (!(flipsetting.getSetting("Settings", "Item Price Maximum:") == 'Max')) {
        if (auc.price > deFormat((flipsetting.getSetting("Settings", "Item Price Maximum:")).toUpperCase())) {
          return auctionRoutep()
        }
      }
        if (flipsetting.getSetting("Settings", "Profit > Price Only:") == true) {
          if ((auc.average_price - auc.price) < auc.price) {
          return auctionRoutep()
        }
      }
        if (flipsetting.getSetting("Exclusions", "Exclude Recombobulated:") == true && auc.extra.rarity_upgrades == 1) {
          return auctionRoutep()
        }

        if (auc.name) {
                try {
                    ChatLib.clearChat(5050);
                    ChatLib.clearChat(5051);
                    ChatLib.clearChat(5052);
                    ChatLib.clearChat(5053);
                } catch (e) {}
  Chatmsg(auc, true)
        }
    } catch (e) {
        new Message(new TextComponent(`No Auction Flips Found`).setHover("show_text", e)).chat()
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var emojiStringToArray = function (str) {
  split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  arr = [];
  for (var i=0; i<split.length; i++) {
    char = split[i]
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
};
const deFormat = s => {
  const letters = "KMBT";
  const base = letters.indexOf(s[s.length - 1]);
  if (base === -1) {
    return parseFloat(s);
  }
  const multiplier = Math.pow(1000, base + 1); // eslint-disable-line no-restricted-properties
  return parseFloat(s.slice(0, -1)) * multiplier;
};
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function riskCalc(val, price) {
  i = price / val
  risk = '&l&f[&4▇▇▇▇▇▇▇▇▇▇&f]'
  if (i > 0.1) {
    risk = '&l&f[&4▇▇▇▇▇▇▇▇▇-&f]'
  }
  if (i > 0.2) {
    risk = '&l&f[&4▇▇▇▇▇▇▇▇---&f]'
  }
  if (i > 0.3) {
    risk = '&l&f[&6▇▇▇▇▇▇▇----&f]'
  }
  if (i > 0.4) {
    risk = '&l&f[&6▇▇▇▇▇▇------&f]'
  }
  if (i > 0.5) {
    risk = '&l&f[&6▇▇▇▇▇--------&f]'
  }
  if (i > 0.6) {
    risk = '&l&f[&6▇▇▇▇---------&f]'
  }
  if (i > 0.7) {
    risk = '&l&f[&a▇▇▇-----------&f]'
  }
  if (i > 0.8) {
    risk = '&l&f[&a▇▇-------------&f]'
  }
  if (i > 0.9) {
    risk = '&l&f[&a▇--------------&f]'
  }
  return `&f&lRISK METER: \n${risk}\n&8This is meant as an indication of if the flip\n&8has risk of losing money.`
}

/*const g = new FlipGui();
register("renderOverlay", () => {
  if (g.gui.isOpen()) {
    g.draw();
  }
});

register("command", () => {
  g.open();
}).setName("gui");
*/
