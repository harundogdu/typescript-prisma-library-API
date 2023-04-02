## Typescript & Prisma § Express Library API

This is a simple API built with Typescript, Prisma, and Express. It is a library API that allows users to create, read, update, and delete books and authors. It also allows users to create, read, update, and delete book authors.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

<h3>Installing</h3>

A step by step series of examples that tell you how to get a development env running

Clone the repository

```bash
git clone https://github.com/harundogdu/typescript-prisma-library-API.git
```

<p>Install dependencies</p>

```bash
npm install
```

<p>Run the development server</p>

```bash
npm run dev
```

<h3>Available Scripts</h3>

<ul>
<li><code>npm run dev</code> - Runs the app in the development mode.</li>
<li><code>npm run start</code> - Runs the app in the production mode.</li>
<li><code>npm run fresh</code> - Drops the database, creates a new one, and runs all migrations.</li>
<li><code>npx prisma db seed</code> - Runs the seed file.</li>
</ul>

## Prisma

Prisma is an open-source database toolkit that makes it easy for developers to reason about their data and how they access it. It is used to query a database inside a Node.js or TypeScript application.

## Prisma Schema

The Prisma schema is the single source of truth for your database schema. It describes your database tables, columns, and relations. It also defines which operations are available on your data.

## Prisma Client

Prisma Client is an auto-generated and type-safe query builder for Node.js & TypeScript. It's used as an alternative to writing plain SQL, or using another database access tool such as SQL query builders (e.g. SQLAlchemy) or ORMs (e.g. TypeORM).

## Available Endpoints

<p>The following endpoints are available in this API. You can use Postman to test them.</p>

<h3>API Prefix</h3>

| Prefix  | Description |
| ------- | ----------- |
| /api/v1 | API         |

<h3>Books</h3>

| Method | Endpoint   | Description      |
| ------ | ---------- | ---------------- |
| GET    | /books     | Get all books    |
| GET    | /books/:id | Get a book by id |
| POST   | /books     | Create a book    |
| PUT    | /books/:id | Update a book    |
| DELETE | /books/:id | Delete a book    |

<h3>Authors</h3>

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | /authors     | Get all authors     |
| GET    | /authors/:id | Get an author by id |
| POST   | /authors     | Create an author    |
| PUT    | /authors/:id | Update an author    |
| DELETE | /authors/:id | Delete an author    |

## Built With

<ul>
<li><a href="https://www.typescriptlang.org/">Typescript</a></li>
<li><a href="https://www.prisma.io/">Prisma</a></li>
<li><a href="https://expressjs.com/">Express</a></li>
<li><a href="https://www.npmjs.com/package/nodemon">Nodemon</a></li>
<li><a href="https://www.npmjs.com/package/ts-node">Ts-Node</a></li>
<li><a href="https://www.npmjs.com/package/ts-node-dev">Ts-Node-Dev</a></li>
<li><a href="https://www.npmjs.com/package/tsconfig-paths">Tsconfig-Paths</a></li>
<li><a href="https://www.npmjs.com/package/esbuild">Esbuild</a></li>
<li><a href="https://www.npmjs.com/package/esbuild-register">Esbuild-Register</a></li>
<li><a href="https://www.npmjs.com/package/dotenv">Dotenv</a></li>
<li><a href="https://www.npmjs.com/package/cors">Cors</a></li>
<li><a href="https://www.npmjs.com/package/express-validator">Express-Validator</a></li>
</ul>

## Authors

<ul>
<li><a href="https://github.com/harundogdu">Harun Doğdu</a></li>
</ul>

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
