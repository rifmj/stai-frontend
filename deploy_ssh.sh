#!/bin/bash

# Define local and remote directories
LOCAL_DIRECTORY="/Users/rifatjumagulov/workspace/vadim/stai.chat/stai-frontend/build/"
REMOTE_USER="root"
REMOTE_HOST="206.81.26.109"
REMOTE_DIRECTORY="/var/www/html/stai-frontend"

# Removing remote directory
ssh "$REMOTE_USER@$REMOTE_HOST" "rm -rf $REMOTE_DIRECTORY && mkdir -p $REMOTE_DIRECTORY"

# Execute rsync command to copy files
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' "$LOCAL_DIRECTORY" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIRECTORY"

# After rsync, execute yarn build and pm2 restart in the remote directory
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIRECTORY"

echo "Files transferred successfully."
