
start:
	docker-compose up

restart:
	docker-compose down
	docker rmi waecm-group-09_frontend:latest
	docker-compose up