const { HighLevelProducer, KafkaClient } = require("kafka-node");

const client = new KafkaClient();
const producer = new HighLevelProducer(client);

producer.on("ready", function() {
	setInterval(() => {
		let payloads = [];
		payloads.push({ topic: "topic1", messages: 'hi' });
		payloads.push({
			topic: "topic2",
			messages: [`Hello world ${new Date().toUTCString()}`]
		});

		producer.send(payloads, function(err, data) {
			console.log(data);
		});
	}, 1000);
});
