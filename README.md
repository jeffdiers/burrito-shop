# Burrito Shop

The Burrito Shop App is a web application that allows customers to browse and order burritos.

**Explor the Graphql API here!** https://api.burrito-shop.online/ (Currently not up)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- View a list of available burritos with details (name, size, price).
- Customize burrito orders with options (e.g., black olives, sour cream). (coming soon...)
- Create and manage orders.
- Calculate the total cost of orders.
- Browse burritos by category or search for specific items.
- User authentication and authorization for secure ordering.
- Web UI for managing burrito listings and orders. (coming soon...)

## Getting Started

### Prerequisites

Before you can run the Burrito Shop App, ensure you have the following software installed on your system:

- Node.js and npm (Node Package Manager)
- PostgreSQL database
- TypeScript
- TypeORM

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/jeffdiers/burrito-shop.git
   ```

2. Change into the project directory:

   ```bash
   cd burrito-shop-app
   ```

3. Install the project dependencies:

   ```bash
   yarn install:app
   ```

4. Setup the database connection in the `.env` file. Add your PostgreSQL database credentials and other enviroment variables as needed. Look at `.env.example` for required variables.

5. Set an api key in the `.env` file. Look at `.env.example` for variable name.

6. Run the database migrations to create the required database tables:

   ```bash
   yarn db:migrate
   ```

7. Start the application:

   ```bash
   yarn dev:app
   ```

The Burrito Shop is now running locally.

### Usage

Examples on how to use the api.

**Create an order**

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --header 'Authorization: api-key-example' \
    --url http://localhost:4000/ \
    --data '{"query":"mutation {\n  createOrder {\n    id\n  }\n}"}'
```

_response_

```json
{
  "id": "1"
}
```

**Create a burrito**

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --header 'Authorization: api-key-example' \
    --url http://localhost:4000/ \
    --data '{"query":"mutation($price: Float!, $size: String!, $name: String!) {\n  createBurrito(price: $price, size: $size, name: $name) {\n    id\n    name\n    size\n    price\n  }\n}","variables":{"price":5.99,"size":"large","name":"Steak"}}'
```

_response_

```json
{
  "id": "2",
  "name": "Steak",
  "size": "large",
  "price": 5.99
}
```

**Create an order item**

````bash
curl --request POST \
    --header 'content-type: application/json' \
    --header 'Authorization: api-key-example' \
    --url http://localhost:4000/ \
    --data '{"query":"mutation($orderId: Float!, $burritoId: Float!, $quantity: Float!) {\n  createOrderItem(orderId: $orderId, burritoId: $burritoId, quantity: $quantity) {\n    id\n    burrito {\n      name\n    }\n    quantity\n  }\n}","variables":{"orderId":1,"burritoId":1,"quantity":2}}'```
````

_response_

```json
{
  "id": "1",
  "burrito": {
    "name": "Chicken"
  },
  "quantity": 2
}
```

**Fetch orders**

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --header 'Authorization: api-key-example' \
    --url http://localhost:4000/ \
    --data '{"query":"query {\n  orders {\n    id\n    items {\n      burrito {\n        name\n      }\n      quantity\n    }\n    totalPrice\n  }\n}","variables":{}}'
```

_response_

```json
[
  {
    "id": "1",
    "items": [
      {
        "burrito": {
          "name": "Chicken"
        },
        "quantity": 2
      },
      {
        "burrito": {
          "name": "Steak"
        },
        "quantity": 1
      }
    ],
    "totalPrice": 15.97
  }
]
```

### Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- TypeORM
- GraphQL
- Docker
- GitHub actions
