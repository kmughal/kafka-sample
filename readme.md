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

- to verify the zookeeper is up.

```sh 
telnet localhost 2181  
```

## Kafka Cheatsheet!
# Topics

You can create a new Kafka topic named `topic2` as follows:

```
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 3 --topic topic2
```

You can verify that the `topic2` topic was successfully created by listing all available topics:

```
kafka-topics --list --zookeeper localhost:2181
```

You can add more partitions as follows:

```
kafka-topics --zookeeper localhost:2181 --alter --topic topic2 --partitions 16
```

You can delete a topic named `topic2` as follows:

```
kafka-topics --zookeeper localhost:2181 --delete --topic topic2
```

You can find more details about a topic named `cc_payments` as follows:

```
kafka-topics --describe --zookeeper localhost:2181 --topic cc_payments
```

You can see the under-replicated partitions for all topics as follows:

```
kafka-topics --zookeeper localhost:2181/kafka-cluster --describe --under-replicated-partitions
```

# Producers

You can produce messages from standard input as follows:

```
kafka-console-producer --broker-list localhost:9092 --topic topic2
```

You can produce new messages from an existing file named `messages.txt` as follows:

```
kafka-console-producer --broker-list localhost:9092 --topic test < messages.txt
```

You can produce Avro messages as follows:

```
kafka-avro-console-producer --broker-list localhost:9092 --topic my.Topic --property value.schema='{"type":"record","name":"myrecord","fields":[{"name":"f1","type":"string"}]}' --property schema.registry.url=http://localhost:8081
```

You can enter a few new values from the console as follows:

```
{"f1": "value1"}
```

# Consumers

## Consume messages

You can begin a consumer from the beginning of the log as follows:

```
kafka-console-consumer --bootstrap-server localhost:9092 --topic topic2 --from-beginning
```

You can consume a single message as follows:

```
kafka-console-consumer --bootstrap-server localhost:9092 --topic topic2  --max-messages 1
```

You can consume a single message from `__consumer_offsets` as follows:

```
kafka-console-consumer --bootstrap-server localhost:9092 --topic __consumer_offsets --formatter 'kafka.coordinator.GroupMetadataManager$OffsetsMessageFormatter' --max-messages 1
```

You can consume and specify a consumer group as follows:

```
kafka-console-consumer --topic topic2 --new-consumer --bootstrap-server localhost:9092 --consumer-property group.id=my-group
```

## Consume Avro messages

You can consume 10 Avro messages from a topic named `position-reports` as follows:

```
kafka-avro-console-consumer --topic position-reports --new-consumer --bootstrap-server localhost:9092 --from-beginning --property schema.registry.url=localhost:8081 --max-messages 10
```

You can consume all existing Avro messages from a topic named `position-reports` as follows:

```
kafka-avro-console-consumer --topic position-reports --new-consumer --bootstrap-server localhost:9092 --from-beginning --property schema.registry.url=localhost:8081
```

## Consumers admin operations

You can list all groups as follows:

```
kafka-consumer-groups --new-consumer --list --bootstrap-server localhost:9092
```

You can describe a Group named `testgroup` as follows:

```
kafka-consumer-groups --bootstrap-server localhost:9092 --describe --group testgroup
```

# Config

You can set the retention for a topic as follows:

```
kafka-configs --zookeeper localhost:2181 --alter --entity-type topics --entity-name topic2 --add-config retention.ms=3600000
``` 

You can print all configuration overrides for a topic named `topic2` as follows:

```
kafka-configs --zookeeper localhost:2181 --describe --entity-type topics --entity-name topic2
```

You can delete a configuration override for `retention.ms` for a topic named `topic2` as follows:

```
kafka-configs --zookeeper localhost:2181 --alter --entity-type topics --entity-name topic2 --delete-config retention.ms 
```

# Performance

Although Kafka is pretty fast by design, it is good to be able to test its performance.
You can check the Produce performance of Kafka as follows:


```
kafka-producer-perf-test --topic position-reports --throughput 10000 --record-size 300 --num-records 20000 --producer-props bootstrap.servers="localhost:9092"
```

# ACLs

You can add a new *consumer* ACL to an existing topic as follows:

```
kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --add --allow-principal User:Bob --consumer --topic topicA --group groupA
```

You can add a new *producer* ACL to an existing topic as follows:

```
kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --add --allow-principal User:Bob --producer --topic topicA
```

You can list the ACLs of a topic named `topicA` as follows:

```
kafka-acls --authorizer-properties zookeeper.connect=localhost:2181 --list --topic topicA
```

# Zookeeper 

You can enter the zookeeper shell as follows:

```
zookeeper-shell localhost:2182 ls 