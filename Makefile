all:
	docker compose build &&\
	docker compose up -d

installf:
	docker exec front npm install

clean:
	docker compose down

fclean: clean
	@docker system prune -af

.PHONY: all
