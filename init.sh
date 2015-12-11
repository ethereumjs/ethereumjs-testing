#!/bin/bash
mkdir tests
cd tests
git init
git remote add origin  https://github.com/ethereum/tests
git config core.sparseCheckout true
# echo "TransactionTests/*" >> .git/info/sparse-checkout
# git pull --depth=1 origin master
