#!/bin/bash

# get repo
git clone https://github.com/yilin-sai/ai-sysdesign.git
# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# install node
nvm install v18.16.0
# install aws cli
sudo apt-get update
sudo apt-get install unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
# set up python
sudo apt install python-is-python3
sudo apt install python3-pip
pip install -r py-requirements.txt
# install graphviz
sudo apt install graphviz