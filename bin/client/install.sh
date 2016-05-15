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
echo "Done"

# Build project (compile TypeScripts + dump assets)
echo "Build Angular web application"
npm run build
echo "Done"