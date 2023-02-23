make-production:
	- docker-compose -f docker-compose.prod.yaml -f docker-compose.prod.yaml up --build

clean:
	- docker volume rm
	- docker stop
	- docker system prune
	- docker image prune -a

process-data-script:
	- cd services/shared && ts-node global-data-seeder.ts --delete
	- cd services/shared && ts-node global-data-seeder.ts --import

build-services:
	- cd services/auth*&& npm run build
	- cd services/events* && npm run build
	- cd services/venues* && npm run build
	- cd services/categories* && npm run build
	- cd services/discount* && npm run build
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