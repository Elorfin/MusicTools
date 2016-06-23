#!/bin/sh

SRC_PATH='client'
CURRENT_DIR="$(dirname "$0")"

# Get colors
source $CURRENT_DIR/../shared/colors.sh

echo -e "${BLUE}[Client update]${NC}"

echo "Move into Client directory ($SRC_PATH)"
cd $SRC_PATH
echo "Done"

# Get dependencies
echo "Update dependencies..."
npm update
echo "Done"

# Build project (compile TypeScripts + dump assets)
echo "Build Angular web application"
npm run build
echo "Done"