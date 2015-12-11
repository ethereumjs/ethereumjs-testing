#!/bin/bash
mkdir tests
cd tests
git init
git remote add -t develop origin https://github.com/ethereum/tests
git checkout -b develop
git config core.sparseCheckout true
# echo "TransactionTests/*" >> .git/info/sparse-checkout
# git pull --depth=1 origin master
