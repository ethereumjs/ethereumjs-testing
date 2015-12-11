#!/bin/bash
mkdir tests
cd tests
git init
git remote add origin git@github.com:ethereum/tests.git
git config core.sparseCheckout true
# echo "TransactionTests/*" >> .git/info/sparse-checkout
# git pull --depth=1 origin master
