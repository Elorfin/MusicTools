#!/bin/sh

SRC_PATH='api'
CURRENT_DIR="$(dirname "$0")"

# Get colors
source $CURRENT_DIR/../shared/colors.sh

echo -e "${BLUE}[API installation]${NC}"

echo "Move into API directory ($SRC_PATH)"
cd $SRC_PATH
echo "Done"

echo "Create application parameters..."
cp -v app/config/parameters.yml.dist app/config/parameters.yml
echo "Done"

# Open parameters
vi app/config/parameters.yml

echo "Install dependencies..."
composer install
echo "Done"

echo "Create and populate api database..."
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --dump-sql
php bin/console doctrine:schema:update --force
php bin/console doctrine:fixtures:load --no-interaction
echo "Done"

echo -e "${GREEN}API successfully installed. You can now start using it${NC}"