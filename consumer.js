const { Consumer, KafkaClient } = require("kafka-node");

const client = new KafkaClient();
const consumer = new Consumer(client, [{ topic: "topic2", partition: 0 }], {
	autoCommit: false
});

let messageId = 0;
const setupKafkaClient = (_, res, __) => {
	consumer.on('message' , m => {
		res.write(`id: ${messageId}\n`);
		res.write(`data: ${JSON.stringify(m)}\n\n`);
		messageId++;
	});
};

const setEventStreamHeaders = (_, res, next) => {
	res.writeHead(200, {
		"content-type": "text/event-stream",
		"cache-control": "no-cache",
		connection: "keep-alive"
	});
	res.write("\n");	
	next();
};

const express = require("express");
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	if (req.method === "OPTOINS") {
		return res.sendStatus(200);
	}
	next();
});

app.get("/event-stream", setEventStreamHeaders, setupKafkaClient);
app.listen(5000, _ => console.log("consumer is on!"));
