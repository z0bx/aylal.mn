# Nomadic Horizon Backend API

MERN Stack backend for the Nomadic Horizon tourism booking platform.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
# Edit .env file with your MongoDB URI and JWT secret

# 3. Start development server
npm run dev

# 4. Server runs on http://localhost:5000
```

## Environment Variables

Create a `.env` file in the server root:

```
MONGO_URI=mongodb://localhost:27017/aylal-mn
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/logout` - Logout user

### Tours
- `GET /api/tours` - Get all tours (paginated)
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour (admin only)
- `PUT /api/tours/:id` - Update tour (admin only)
- `DELETE /api/tours/:id` - Delete tour (admin only)

### Bookings
- `POST /api/bookings` - Create booking (authenticated)
- `GET /api/bookings` - Get user's bookings (authenticated)
- `GET /api/bookings/all` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking details (authenticated)
- `PUT /api/bookings/:id` - Update booking status (admin only)

### Reviews
- `GET /api/reviews/tour/:tourId` - Get tour reviews
- `POST /api/reviews/tour/:tourId` - Create review (authenticated)
- `DELETE /api/reviews/:id` - Delete review (authenticated)

## Database Models

### User
- name: String
- email: String (unique)
- password: String (hashed)
- phone: String
- role: String (user/admin)
- profileImage: String
- timestamps

### Tour
- title: String
- description: String
- price: Number
- duration: Number (days)
- location: String
- maxCapacity: Number
- image: String
- daysItinerary: Array
- rating: Number
- reviewCount: Number
- createdBy: ObjectId (User)
- timestamps

### Booking
- userId: ObjectId (User)
- tourId: ObjectId (Tour)
- travellers: Array
- paymentMethod: String
- cardDetails: Object
- totalPrice: Number
- discount: Number
- status: String (pending/confirmed/completed/cancelled)
- timestamps

### Review
- userId: ObjectId (User)
- tourId: ObjectId (Tour)
- rating: Number (1-5)
- comment: String
- timestamps

## Testing with Postman

1. Import the collection: `postman/Nomadic-Horizon-API.postman_collection.json`
2. Set environment variables (baseUrl, authToken)
3. Register/login to get auth token
4. Test protected endpoints with Bearer token

## Project Structure

```
server/
├── config/
│   └── db.js                 - MongoDB connection
├── models/
│   ├── User.js
│   ├── Tour.js
│   ├── Booking.js
│   └── Review.js
├── controllers/
│   ├── authController.js
│   ├── tourController.js
│   ├── bookingController.js
│   └── reviewController.js
├── middleware/
│   └── auth.js               - JWT verification
├── routes/
│   ├── authRoutes.js
│   ├── tourRoutes.js
│   ├── bookingRoutes.js
│   └── reviewRoutes.js
├── server.js                 - Express app entry
├── package.json
├── .env
└── .gitignore
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment configuration
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin requests

## Development

```bash
# Start with hot reload
npm run dev

# Production build
npm start
```

## Authentication Flow

1. User registers with email/password
2. Password is hashed with bcryptjs
3. JWT token is generated and returned
4. Client stores token in localStorage
5. Protected requests include: `Authorization: Bearer {token}`
6. Middleware verifies token and extracts user info

## Admin Features

Endpoints marked as "admin only" require:
- Valid JWT token
- User role must be "admin"

To make a user admin, update in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Deployment

### Heroku
```bash
git push heroku main
```

### Railway / Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy on push

### Local Production
```bash
NODE_ENV=production npm start
```

## Error Handling

All endpoints return standard JSON responses:

**Success (2xx)**
```json
{
  "success": true,
  "data": {...}
}
```

**Error (4xx/5xx)**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Notes

- Passwords are hashed before storage
- JWT tokens expire in 7 days
- CORS is enabled for frontend communication
- SQL injection not applicable (using MongoDB)
- Input validation on all endpoints
- Rate limiting recommended for production

## Contributing

1. Create feature branch
2. Make changes
3. Test with Postman
4. Submit pull request

## License

MIT
