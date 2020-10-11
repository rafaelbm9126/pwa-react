run:
	docker run -it -v ${PWD}/app:/app -p 80:3000 -w /app node:latest npm run start

install:
	docker run -it -v ${PWD}/app:/app -w /app node:latest npm install

build:
	docker run -it -v ${PWD}/app:/app -w /app node:latest npm run build

up: build
	docker run -v ${PWD}/app:/app -p 80:3000 -w /app node:latest npm run serve

start: build
	docker-compose up -d
