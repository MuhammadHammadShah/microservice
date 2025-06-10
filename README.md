- a function in express-expression is a middleware

`npx ts-jest config:init`

`verbose: true` in jest.config.js

- docker pull postgres
- docker volume create mernpgdata
- docker run --rm --name mernpg-container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -v mernpgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres
- docker exec -it mernpg-container psql -U root
