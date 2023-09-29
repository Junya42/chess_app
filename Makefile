all:
	docker compose build &&\
	docker compose up -d

installf:
	docker exec front npm install

installb:
	docker exec back npm install

logs:
	docker logs database &&\
	docker logs back

studio:
	docker exec back npm run prisma:studio

clean:
	docker compose down

fclean: clean
	@docker system prune -af

.PHONY: all logs clean fclean installf installb studio
