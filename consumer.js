const { Consumer, KafkaClient } = require("kafka-node");

const client = new KafkaClient();

const consumer = new Consumer(client, [{ topic: "topic1", partition: 0 }], {
	autoCommit: false
});

consumer.on("message", m => {
	console.log(
		`message received : ${new Date().toUTCString()}, message:${JSON.stringify(
			m,
			null,
			2
		)}`
	);
});
