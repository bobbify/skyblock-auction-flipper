import { request } from "../requestV2";
i = 0
it_no = 0
auctions = null

register("tick", ticker)
function ticker() {
	i++
	if (i > 600) {
		i = 0
request({
    url: 'https://auction-destroyer.herokuapp.com/',
    json: true,
		connectTimeout: 1000
})
    .then(function(response) {
        // If the website does not return valid JSON data,
        // then the parsing will fail and the catch block
        // will run
        auctions = response

				//ChatLib.chat('New auctions are in!')
				//it_no = 0

    });
}

}

register('command', auctionRoute)
.setName('af')

function auctionRoute() {

try {
	auc = auctions[it_no]
try {
ChatLib.clearChat(5050);
ChatLib.clearChat(5051);
ChatLib.clearChat(5052);
} catch(e) {

}
new Message(new TextComponent(`&l&f${auc.name} &r| &6Avg: $${numberWithCommas(auc.average_price)}&r| &6Price: $${numberWithCommas(auc.price)}`)).setChatLineId(5050).chat();
new Message(new TextComponent("&l&2[To Auction] ").setClick("run_command", `/viewauction ${auc.seller}`)).setChatLineId(5051).chat();
new Message(new TextComponent("&l&4[Next]").setClick("run_command", `/af`)).setChatLineId(5052).chat();

it_no = Math.floor(Math.random() * auctions.length);
}catch(e){
	ChatLib.chat('No auctions in cache.')
}
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

