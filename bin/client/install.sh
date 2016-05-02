#!/bin/sh

SRC_PATH='client'
CURRENT_DIR="$(dirname "$0")"

# Get colors
source $CURRENT_DIR/../shared/colors.sh

echo -e "${BLUE}[Client installation]${NC}"

echo "Move into API directory ($SRC_PATH)"
cd $SRC_PATH
echo "Done"

# Get dependencies
echo "Install dependencies..."
npm install
bower install
echo "Done"

# Build project
echo "Build Angular 1 web application"
grunt build
echo "Done"

echo "Build Angular 2 web application"
npm run webpack
echo "Done"