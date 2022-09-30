compose-services:
	- cd backend
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml up --build

stop-services:
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml down

make-production:
	- docker-compose -f docker-compose.prod.yaml -f docker-compose.prod.yaml up --build

clean:
	- docker volume rm
	- docker stop

run:
	- skaffold dev
	- kubectl get pods
	- kubectl get deployments


deploy-containers:
	- cd infrastructure/k8s
	- cat ingress-service.yaml