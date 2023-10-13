# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `yarn` command
2. Setup database settings inside `data-source.ts` file
3. Run `yarn start` command

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --header 'api-key: api-key-123' \
    --url http://localhost:4000/graphql \
    --data '{"query":"query Query {\n burritos {\n id\n name\n size\n price\n }\n}"}'
```

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://ec2-54-234-208-224.compute-1.amazonaws.com/' \
    --data '{"query":"query {\n  burritos {\n    id\n    name\n    size\n    price\n  }\n}"}'
```
