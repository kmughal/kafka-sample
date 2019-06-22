# Introduction

This is a sample for kafka

In order to run this project you have to run the kafka server first. Follow below instructions:

- Download Kafka server 

```sh
  > tar -xzf kafka_2.12-2.2.0.tgz
  > cd kafka_2.12-2.2.0
```

- Kafka uses Zookeeper after downloading that run this comand:

```sh
bin/zookeeper-server-start.sh config/zookeeper.properties
```

- Now run the server

```sh
  bin/kafka-server-start.sh config/server.properties
```