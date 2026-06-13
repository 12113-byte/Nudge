# Nudge Backend

## How to set up on your machine

### Prerequisites

- Node.js v18+
- PostgreSQL installed and running locally on port 5433

### Steps

**1. Clone the repo and go into the backend folder**

```bash
git clone https://github.com/12113-byte/Nudge.git
cd Nudge/backend
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up your environment variables**

```bash
cp .env.example .env
```

Then open `.env` and fill in your details:

```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5433/nudge_dev"
PORT=5001
NODE_ENV="development"
JWT_SECRET=""
JWT_EXPIRES_IN="7d"
```

Replace `yourpassword` with your local PostgreSQL password.

Generate a secure `JWT_SECRET` by running:

```bash
openssl rand -base64 32
```

Copy the output and paste it as the value for `JWT_SECRET`.

**4. Create the database**

Open pgAdmin, expand your server in the left panel, right-click on **Databases** → **Create** → **Database**, enter `nudge_dev` as the name, and click Save.

**5. Run migrations**

```bash
npx prisma migrate dev
```

This creates all the tables in your database.

**6. Generate the Prisma client**

```bash
npx prisma generate
```

**7. Start the server**

```bash
npm run dev
```

Server runs on `http://localhost:5001`

---

## Endpoints

**Register a user**

- Method: `POST`
- URL: `http://localhost:5001/auth/register`
- Body (raw JSON):

```json
{
  "first_name": "Alex",
  "last_name": "Morgan",
  "email": "alex@example.com",
  "password": "password123"
}
```

**Login**

- Method: `POST`
- URL: `http://localhost:5001/auth/login`
- Body (raw JSON):

```json
{
  "email": "alex@example.com",
  "password": "password123"
}
```

**Business Register**

- Method `POST`
- URL: `http://localhost:5001/business/register`
- Body (raw JSON):

```json
{
  "first_name": "John",
  "last_name": "Smith",
  "company_name": "Bowling 4 You",
  "email": "coolguybowling1@example.com",
  "password": "password",
  "phone_number": "123456",
  "address": "100, Collins St, Melbourne",
  "abn": "123456778",
  "website": "www.bowling.com",
  "about": "The best bowling you'll ever experience",
  "image_urls": []
}
```

**Business login**

- Method: `POST`
- URL: `http://localhost:5001/business/login`
- Body (raw JSON):

```json
{
  "email": "coolguybowling@example.com",
  "password": "password"
}
```

**Get all businesses**

- Method `GET`
- URL: `http://localhost:5001/business/`
- No body

**Get business by id**

- Method `GET`
- URL: `http://localhost:5001/business/:id`
- No body

**Update business**

- Method `PATCH`
- URL: `http://localhost:5001/business/profile`
- Body (raw JSON):

```json
{
  "id": 1,
  "updateData": {
    "field_to_update": "new value"
  }
}
```

---

## Testing with Vitest

**1- install latest packages**

```bash
cd backend
npm install
```

**2.1- run tests (without coverage)**

```bash
npm t
```

**2.2- run tests (with coverage report)**

```bash
npx vitest --coverage
```

**3- quit**

```bash
q
```

**Refer to /Nudge/backend/src/controllers/businessController/businessController.test.ts for structure example**

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma v7 with `@prisma/adapter-pg`
- **Database:** PostgreSQL
- **Auth:** JWT + bcrypt
