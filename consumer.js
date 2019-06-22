const { Consumer, KafkaClient } = require("kafka-node");

const client = new KafkaClient();

const consumer = new Consumer(client, [{ topic: "topic2", partition: 0 }], {
	autoCommit: false
});

consumer.on("message", m => {
	console.log(
		JSON.stringify(
			m,
			null,
			2
		)
	);
});
