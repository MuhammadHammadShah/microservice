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

docker run --env-file $(pwd)/.env.dev -e PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAzHm0wubtpbBtn6CNpNvU18rwlj1G527CKV76QmHQVXFwpOZ1
TGM9ohEe3y3UuSRYWhBud4boP3geR58vAJyS0NMJtQDrnJciGIhA0MD3YGSEZ3J8
sD2TnXztuL9rBuE6Ro9JRjWMzM8J9wUpBKKNMXJk/fdlIh4kmjl3vRANGuxdDDQk
IHeNdoCPUDJuNdhHUg+unj3478XaxWBK+Qkcvjx2Oty0LevSJoMw4uyC6Cm+Ol2g
72WWh5rQupGbNxLJP3nAyh7HTm5g2qbJdvzIoSuSR5AJq54Q4Fp7wAOsgL132N/l
YqM3kcuhoEwwbb6EPuRf+8g3gGpioSg5gDKWZQIDAQABAoIBAAh4hkeIv5GcpH33
bcbFoKSr8JmYwkY2LW7/U0jKupG/mFYMghF/Dv+Wy/uc73IYElzwz1K+UQLIHCEF
dDIHSoHCLGXGOvyKukvf4SeExvrET0Pl10qJ0oK0uThtHab0T7C6oON6tnGJpjUI
jrF1dnn07kAjLppiO0v0U4SOlKxnyV+ijrYb+c1AVLczIuc8Xqj+nYwufGF7XrFH
JL9cwxPblmKiCMAHpDuh8I1tnic4WpU8ocPXmzIVmLg8LMKzihOi4Vk6px32rdk1
76ryIssaQMMRH70esxdjMSWuNuX4avZAoJpN27zJfjIRCM2SSrkZcPno9Di+iUEq
ROaYNWECgYEA7EJgMZmxlZ7iGn2HNVVBEGTl7QN4l/+Q3o+kjJOFY2ZVNR/JVa/n
VmolQ2q27xZ1IPxT63n8PzFzLsN+LOMK0jQ9V6I+uLFNJ+Jf76B/Gu0kuyMaPVHT
Z2MJZzeB+XV142GVtkQklGLMXN0BhDUdaaoFNz9IZtIFER7yQOPBxpkCgYEA3Y93
4v/3erJcjNEslGYUucSXjduj2jMVMVQ0bwzVPoSg/BBhmDE6THhd6QDSI9EXi0V3
dp27p1MQFBK2jgWNgIDqSOXfFN+Ho+f8FvMUYU4YA54bM/QayhsiEqjQeNlesAew
IFJn0KpO2hEng7aX1eabQzLvcXnN4x9ADdbkCa0CfyTqOh2F5jl6mdmJw5aRu5jU
KxjdcfpN9FTSHOPaKP1e//FNBihdU8gszaW7BtpUp/h/dJ1WchNtppGn+g8Jaqdt
gigvMZ2qFmQk+th2O2X5p8OVuIPcRSviTZXTFnvj3oeot7vC6fRFe6kG3zXJFs9r
wWTgfm+SYThLnY6GB8ECgYEAwaLKt3TYGL7bjiKeIJBa2sSLY+qq+F+ezP732HpR
wJLvk3zJntafSggEo0gZYD40on6y2tMeFy3MJo74R4Vo1v9UQyPL5RU7Ga/9LR2D
GUvERx0eTzivVSWDkOVDVes8CwKdFpKOstq1kXZen4msh8BEv+U7SWSX4UEFnVLK
9/0CgYEAgZtJlmPgM7ggTR5PQawhUMpmc5mHUnu/v7QWyJEKQ9QRGT1zoljf4PkE
SuO209wIVfx56Y3kckccg1OnEeiwcPcURZ8m1uNK9hdRL04Pi8TOj6OPIfPZNyDV
5PO+wW9UWGyzmd/8xnzaTVshsERZY583xc4vxJbMLWBTAaws7dU=
-----END RSA PRIVATE KEY-----" -p 5501:5501 muhammadhammadshah2000/mernstack_auth_service:build-9
