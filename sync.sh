#!/usr/bin/env bash

rsync -avz --delete \
      --exclude='build' \
      --exclude='node_modules' \
      --exclude='.git' \
      --exclude='coverage' \
      --exclude='android' \
      --exclude='ios' \
      ./helpers/ \
      ./quickstart/node_modules/@native-firebase/helpers/

rsync -avz --delete \
      --exclude='build' \
      --exclude='node_modules' \
      --exclude='.git' \
      --exclude='coverage' \
      --exclude='android' \
      --exclude='ios' \
      ./core/ \
      ./quickstart/node_modules/@native-firebase/core/

rsync -avz --delete \
      --exclude='build' \
      --exclude='node_modules' \
      --exclude='.git' \
      --exclude='coverage' \
      --exclude='android' \
      --exclude='ios' \
      ./config/ \
      ./quickstart/node_modules/@native-firebase/config/
