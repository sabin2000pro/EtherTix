compose-services:
	- cd backend

make-production:
	- docker-compose -f docker-compose.prod.yaml -f docker-compose.prod.yaml up --build

clean:
	- docker volume rm
	- docker stop

deploy-containers:
	- cd infrastructure/k8s
	- cat ingress-service.yaml

build-services:
	- cd services/auth* && npm run build
	- cd services/events && npm run build
	- cd services/shared && ts-node global-data-seeder.ts --delete
	- cd services/shared && ts-node global-data-seeder.ts --import

	- docker login
	- cd services/auth* && docker build -t sabin2000/ethertix-auth-service . && docker push sabin2000/ethertix-auth-service
	- cd services/auth* && docker build -t sabin2000/ethertix-events-service . && docker push sabin2000/ethertix-events-service
	- cd services/auth* && docker build -t sabin2000/ethertix-tickets-service . && docker push sabin2000/ethertix-tickets-service
	- cd services/auth* && docker build -t sabin2000/ethertix-discount-service . && docker push sabin2000/ethertix-discount-service
	- cd services/auth* && docker build -t sabin2000/ethertix-venues-service . && docker push sabin2000/ethertix-venues-service

	- docker volume prune && docker system prune
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml up --build
	- kubectl get pods
	- kubectl get deployments

stop-services:
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml down