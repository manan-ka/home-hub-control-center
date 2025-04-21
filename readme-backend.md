
# HomeHub Spring Boot Backend

This is the Spring Boot backend for the HomeHub smart home control center application.

## Features

- REST API for managing devices and rooms
- JWT-based authentication
- PostgreSQL database integration
- Spring Security for endpoint protection

## Setup Instructions

1. Ensure you have Java 17+ and Maven installed
2. Create a PostgreSQL database named `homehub`
3. Update database credentials in `application.properties` if needed
4. Run the application:
   ```
   mvn spring-boot:run
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user

### Devices
- GET /api/devices - Get all devices for the authenticated user
- POST /api/devices - Add a new device
- PUT /api/devices/{id}/toggle - Toggle a device on/off
- PUT /api/devices/{id}/status - Update device status

### Rooms
- GET /api/rooms - Get all rooms for the authenticated user
- POST /api/rooms - Add a new room

## Integrating with the React Frontend

Update your Supabase URLs in the React frontend to point to these Spring Boot endpoints:
- `http://localhost:8080/api/devices` instead of Supabase device endpoints
- `http://localhost:8080/api/rooms` instead of Supabase room endpoints
- `http://localhost:8080/api/auth/login` for authentication
