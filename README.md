- a function in express-expression is a middleware

`npx ts-jest config:init`

`verbose: true` in jest.config.js

- docker pull postgres
- docker volume create mernpgdata
- docker run --rm --name mernpg-container -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -v mernpgdata:/var/lib/postgresql/data -p 5432:5432 -d postgres
- docker exec -it mernpg-container psql -U root

- docker build --no-cache -t mernstack_test_prod_image -f docker/prod/Dockerfile .

don't install `npm i -D @types/express-validator`

Record is a type of key-value pair where <string,string> is (key,value)

- npm run migration:generate -- src/migration/migration -d src/config/data-source.ts

-- is to put parameters

- npm run migration:run -- -d src/config/data-source.ts

the above command will run the `up` method, which is in the migration file.

- "migration:create": "typeorm-ts-node-commonjs migration:create"

`write the complete command for above, like you do for the above 2 next to it`

. in github actions different `jobs` can be placed in different machines.
