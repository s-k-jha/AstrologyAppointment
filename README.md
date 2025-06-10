## How to Run Locally

- git clone [https://github.com/s-k-jha/AstrologyAppointment]
- cd Root_Folder
- npm install
- refer .env.example to create .env file  # update your DB credentials
- npm start


## API Endpoints

### Auth
- `POST /auth/signup` – Register user
- `POST /auth/login` – Login user

### APIs

- `GET /astrologers` – returns list of available astrologers
- `POST /appointments` – book an appointment
- `GET /appointments` – view user’s appointments

## Tech Stack
- Node.js
- Express
- MongoDB
- JWT Auth
- Bcrypt
- React.js
- Render (Frontend + Backend) Hosting
- Atlas (for DB hosting)

## Full-Stack App where
- Users will be able to register and log in.
- View astrologers.
- Authenticated users will be able Book appointments with available astrologers.
- Data will be stored securely in MongoDB.

