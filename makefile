dev:
	docker run -it -v ${PWD}/app:/app -p 80:3000 -w /app --name service node:latest npm run start

install:
	docker run -it -v ${PWD}/app:/app -w /app --name service node:latest npm install

build:
	docker run -it -v ${PWD}/app:/app -w /app --name service node:latest npm run build

serve: build
	docker run -v ${PWD}/app:/app -p 80:3000 -w /app --name serve node:latest npm run serve

start:
	docker-compose up -d

log:
	docker-compose logs -f
