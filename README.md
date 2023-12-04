POST /signup: Registering a new user
POST /login: Logging in
GET /user: Retrieving a user’s profile (restricted to the user themselves)
PATCH /users/:userId: Updating a user’s profile (restricted to the user themselves)
GET /users/all: Retrieving all users (available to all users)
PATCH /user/change-role/:userId: Updating a user’s role (restricted to admins)
DELETE /user/:userId: Deleting a user (restricted to admins