#!/usr/bin/env bash

rsync -avz --delete \
      --exclude='build' \
      --exclude='node_modules' \
      --exclude='.git' \
      --exclude='coverage' \
      ./helpers/ \
      ./quickstart/node_modules/@native-firebase/helpers/

rsync -avz --delete \
      --exclude='build' \
      --exclude='node_modules' \
      --exclude='.git' \
      --exclude='coverage' \
      ./core/ \
      ./quickstart/node_modules/@native-firebase/core/

rsync -avz --delete \
      --exclude='build' \
      --exclude='node_modules' \
      --exclude='.git' \
      --exclude='coverage' \
      ./config/ \
      ./quickstart/node_modules/@native-firebase/config/
