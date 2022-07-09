#!/bin/bash
set -e

mongo <<EOF
use $MONGODB_APP_DBNAME

db.createUser({
  user: '$MONGODB_APP_USER',
  pwd: '$MONGODB_APP_PASS',
  roles:  [{ role: 'readWrite', db: '$MONGODB_APP_DBNAME' }]
});
EOF