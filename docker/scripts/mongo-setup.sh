#!/bin/bash

MONGODB_REPLICA_1=mongo_replica_1

echo "************ [ Waiting for startup ] **************" ${MONGODB_REPLICA_1}

until mongosh --host ${MONGODB_REPLICA_1}:27017 --eval "printjson(db.serverStatus())"; do
  printf '.'
  sleep 1
done

echo "************ [ Startup completed ] **************" ${MONGODB_REPLICA_1}

mongosh --host ${MONGODB_REPLICA_1}:27017 <<EOF
var configuration = {
    "_id": "dbrs",
    "protocolVersion": 1,
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "${MONGODB_REPLICA_1}:27017",
            "priority": 3
        },
    ],
    "settings": {
        "chainingAllowed": true
    }
};
rs.initiate(configuration);
rs.secondaryOk();
db.getMongo().setReadPref('nearest');
EOF 