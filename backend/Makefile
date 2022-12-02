make-production:
	- docker-compose -f docker-compose.prod.yaml -f docker-compose.prod.yaml up --build

clean:
	- docker volume rm
	- docker stop
	- docker system prune

process-data-script:
	- cd services/shared && ts-node global-data-seeder.ts --delete
	- cd services/shared && ts-node global-data-seeder.ts --import

build-services:

	- cd services/auth*&& npm run build
	- cd services/events* && npm run build
	
	- cd services/venues* && npm run build
	- cd services/discount* && npm run build
	- cd services/posts* && npm run build
	- cd services/comments* && npm run build
	- cd services/chat* && npm run build

	- docker login

	- cd services/auth* && docker build -t sabin2000/ethertix-auth-service . && docker push sabin2000/ethertix-auth-service
	- cd services/events* && docker build -t sabin2000/ethertix-events-service . && docker push sabin2000/ethertix-events-service
	- cd services/tickets* && docker build -t sabin2000/ethertix-tickets-service . && docker push sabin2000/ethertix-tickets-service
	- cd services/discount* && docker build -t sabin2000/ethertix-discount-service . && docker push sabin2000/ethertix-discount-service
	- cd services/venues* && docker build -t sabin2000/ethertix-venues-service . && docker push sabin2000/ethertix-venues-service
	- cd services/posts* && docker build -t sabin2000/ethertix-posts-service . && docker push sabin2000/ethertix-posts-service
	- cd services/comments* && docker build -t sabin2000/ethertix-comments-service . && docker push sabin2000/ethertix-comments-service

	- docker volume prune && docker system prune
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml up --build

stop-services:
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml down --remove-orphans