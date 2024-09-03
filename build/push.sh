#!/bin/sh
##### start push pacakge bin #####

git config --global user.email "sw@bitswrt.com"
git config --global user.name "nhx-vue"

git clone git@ssh.dev.azure.com:v3/lede/NHX-VUE/nhxweb files_push
cd files_push

git init
git remote -v
git push -u origin master
echo "========================== ls -lR =========================="
ls -lR

cd ..
mkdir -p files_push/nhxweb
echo "========================== cp -rf files files_push/nhxweb =========================="
cp -rf files files_push/nhxweb
cd files_push
echo "========================== ls -lR =========================="
ls -lR


git init ./
git add ./
echo "========================== git commit =========================="
git commit -m "update dist"
git status -s
git remote add origin git@ssh.dev.azure.com:v3/lede/NHX-VUE/nhxweb
git remote -v
echo "========================== git push --force origin master =========================="
git push --force origin master
