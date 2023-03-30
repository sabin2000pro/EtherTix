make-production:
	- docker-compose -f docker-compose.prod.yaml -f docker-compose.prod.yaml up --build

compile-smart-contract:
	- cd ../frontend && truffle compile && truffle migrate --reset

clean:
	- docker volume rm
	- docker stop
	- docker system prune
	- docker image prune -a

process-data-script:
	- cd services/shared && ts-node global-data-seeder.ts --delete
	- cd services/shared && ts-node global-data-seeder.ts --import

build-services:
	- cd services/auth* && npm run build && docker build -t sabin2000/ethertix-auth-service .
	- cd services/events* && npm run build && docker build -t sabin2000/ethertix-events-service .
	- cd services/venues* && npm run build && docker build -t sabin2000/ethertix-venues-service .
	- cd services/categories* && npm run build && docker build -t sabin2000/ethertix-categories-service .
	- cd services/discount* && npm run build && docker build -t sabin2000/ethertix-discount-service .
	- cd services/api-gateway* && npm run build && docker build -t sabin2000/ethertix-api-gateway-service .

	- docker login
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml up --build

stop-services:
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml down --remove-orphans

run-backend-prod:
	- pm2 start server

build-frontend:
	- cd ../frontend && npm run build && docker build -t sabin2000/ethertix-frontend-service . && docker push sabin2000/ethertix-frontend-service

show-docker-images:
	- docker image ls

create-networks:
	- docker network create api-gateway-service
	- docker network create discounts-service
	- docker network create my-service-network
	- docker network create auth-service
	- docker network create events-service
	- docker network create venues-service
	- docker network create tickets-service
	- docker network create categories-service
	