## 1.Prerequisites

- Node.js >=20 (Recommended)

---

## 2.Installation

#### Using Yarn (Recommended)

```sh
yarn install
yarn dev
```

#### Using Npm

```sh
npm i
npm run dev
```

---

## 3.Mock Server

By default we provide demo data from : `https://api-dev-minimal...`

To set up your local server:

**Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

**Resource:** [Download](https://www.dropbox.com/scl/fo/bopqsyaatc8fbquswxwww/AKgu6V6ZGmxtu22MuzsL5L4?rlkey=8s55vnilwz2d8nsrcmdo2a6ci&dl=0).

---

**NOTE:** When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly.

# Docker

docker build -t starter-next-js .
docker run -d -p 3033:3033 --env-file .env --name starter-next-js starter-next-js

# Then open app

http://localhost:3033

# Debug

docker exec -it starter-next-js sh
printenv

# Stop and rebuild Docker image

docker stop starter-next-js
docker rm starter-next-js
docker build -t starter-next-js .
docker run -d -p 3033:3033 --name starter-next-js starter-next-js
