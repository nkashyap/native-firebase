#!/usr/bin/env bash

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./admob/ \
      ./quickstart/node_modules/@native-firebase/admob/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./analytics/ \
      ./quickstart/node_modules/@native-firebase/analytics/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./app-indexing/ \
      ./quickstart/node_modules/@native-firebase/app-indexing/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./auth/ \
      ./quickstart/node_modules/@native-firebase/auth/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./config/ \
      ./quickstart/node_modules/@native-firebase/config/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./core/ \
      ./quickstart/node_modules/@native-firebase/core/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./crash/ \
      ./quickstart/node_modules/@native-firebase/crash/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./database/ \
      ./quickstart/node_modules/@native-firebase/database/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./dynamic-links/ \
      ./quickstart/node_modules/@native-firebase/dynamic-links/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./helpers/ \
      ./quickstart/node_modules/@native-firebase/helpers/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./invites/ \
      ./quickstart/node_modules/@native-firebase/invites/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./messaging/ \
      ./quickstart/node_modules/@native-firebase/messaging/

rsync -avz --delete \
      --exclude='android' \
      --exclude='ios' \
      ./storage/ \
      ./quickstart/node_modules/@native-firebase/storage/
