# MindWell API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication (`/auth`)

Authentication is handled via HTTP-Only cookies. Once logged in, `accessToken` and `refreshToken` cookies are automatically sent with subsequent requests if `credentials: 'include'` is set.

### Register
`POST /auth/register`
Creates a new user account.
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "strongpassword123",
    "persona": "student" // 'student', 'professional', 'parent'
  }
  ```
- **Response:** `201 Created`

### Login
`POST /auth/login`
Authenticates a user.
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "strongpassword123"
  }
  ```
- **Response:** `200 OK`

### Logout
`POST /auth/logout`
Clears authentication cookies.
- **Response:** `200 OK`

### Get Current User
`GET /auth/me`
Retrieves the currently authenticated user's profile.
- **Response:** `200 OK`

---

## Mood Tracking (`/moods`)

### Log Mood
`POST /moods`
Logs or updates a mood for the current day.
- **Body:**
  ```json
  {
    "score": 4, // 1 to 5
    "note": "Feeling productive today",
    "factors": ["Study", "Sleep"]
  }
  ```
- **Response:** `201 Created`

### Get Mood History
`GET /moods?days=14`
Retrieves chronological mood history.
- **Response:** `200 OK`

### Get Mood Stats
`GET /moods/stats`
Retrieves average mood and current streak.
- **Response:** `200 OK`

---

## Exercises (`/exercises`)

### Toggle Exercise Progress
`POST /exercises/:id/toggle`
Marks an exercise ID as done or undone for the user.
- **Response:** `200 OK`
  ```json
  {
    "done": true,
    "exerciseId": 1
  }
  ```

### Get Exercise Progress
`GET /exercises/progress`
Retrieves an array of completed exercise IDs.
- **Response:** `200 OK`
  ```json
  {
    "completed": [1, 3]
  }
  ```

---

## AI Chat (`/chat`)

### Get Chat History
`GET /chat`
Retrieves the user's chronological chat history.
- **Response:** `200 OK`

### Send Message
`POST /chat`
Sends a message to the AI and retrieves a simulated response.
- **Body:**
  ```json
  {
    "content": "I'm feeling really anxious about my exams."
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "userMessage": { "role": "user", "content": "..." },
    "aiMessage": { "role": "ai", "content": "..." }
  }
  ```

---

## Community (`/posts`)

### Get Feed
`GET /posts?page=1&limit=20`
Retrieves a paginated list of anonymous posts.
- **Response:** `200 OK`

### Create Post
`POST /posts`
Creates a new anonymous post.
- **Body:**
  ```json
  {
    "content": "Can anyone recommend good focus techniques?"
  }
  ```
- **Response:** `201 Created`

### Toggle Like
`POST /posts/:id/like`
Toggles a like on a post.
- **Response:** `200 OK`
  ```json
  {
    "liked": true,
    "likesCount": 42
  }
  ```

### Add Comment
`POST /posts/:id/comments`
Adds a comment to a post.
- **Body:**
  ```json
  {
    "content": "Box breathing really helps me!"
  }
  ```
- **Response:** `201 Created`

### Get Comments
`GET /posts/:id/comments`
Retrieves comments for a specific post.
- **Response:** `200 OK`
