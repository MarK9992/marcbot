var Slack = require('slack-client'),
	SLACK_TOKEN = process.argv[2],
	autoReconnect = true, // Automatically reconnect after an error response from Slack.
	autoMark = true, // Automatically mark each message as read after it is processed.
	slack = new Slack(SLACK_TOKEN, autoReconnect, autoMark),
	SELF_USER = "U0DK0NES3",
	MARC_USER = "U08PP5TFX";

slack.on('open', function() {
    console.log("Connected to", slack.team.name, "as", slack.self.name);
});

slack.on('message', function(message) {
	var channel = slack.getChannelGroupOrDMByID(message.channel),
		selfQuote = new RegExp("<@" + SELF_USER + ">");
	
	console.log(message);
	if (message.user == "USLACKBOT") {
		channel.send("Ta gueule.");
	}
	else if (message.subtype == "group_join" || message.subtype == "channel_join") {
		channel.send("Bonjour.");
	}
	else if (selfQuote.test(message.text)) {
		var random = Math.random() * 100;

		console.log("I was quoted.");
		if (random < 20) {
			channel.send("Le Java est le COBOL de notre époque.");
			channel.send("http://www.writeups.org/img/inset/Kobold_wow_h1.jpg");
		}
		else if (random < 40) {
			channel.send("Go sera le nouveau Java.");
		}
		else if (random < 60) {
			channel.send("On devrait compiler un langage potable vers du C++.");
		}
		else if (random < 80) {
			channel.send("La carte de Marc chauffe.");
		}
		else {
			channel.send("Je sens... la chaleur...")
		}
	}
});

slack.on("error", function(err) {
	console.log("Error", err);
});

slack.login();