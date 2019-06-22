const { HighLevelProducer, KafkaClient } = require("kafka-node");

const client = new KafkaClient();
const producer = new HighLevelProducer(client);

producer.on("ready", function() {
	setInterval(() => {
		let payloads = [];
		//payloads.push({ topic: "topic1", messages: 'hi' });
		payloads.push({
			topic: "topic2",
			attributes: 2,
			key : 'topic2_key',
			messages: [`Hello world ${new Date().toUTCString()}`, JSON.stringify({name : 'khurram' , address : 'custom address'})]
		});

		producer.send(payloads, function(err, data) {
			console.log(data);
		});
	}, 1000);
});
