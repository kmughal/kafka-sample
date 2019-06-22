const { HighLevelProducer, KafkaClient } = require("kafka-node");

const client = new KafkaClient();
const producer = new HighLevelProducer(client);

producer.on("ready", function() {
	setInterval(() => {
		let payloads = [];
		payloads.push({ topic: "topic1", message: new Date() });
		payloads.push({
			topic: "topic2",
			message: `Hello world ${new Date().toUTCString()}`
		});

		producer.send(payloads, function(err, data) {
			console.log(data);
		});
	}, 1000);
});
