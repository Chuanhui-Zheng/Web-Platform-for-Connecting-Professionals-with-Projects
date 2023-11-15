# API examples

## Login

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "professional@example.com",
  "password": "Password123"
}
```

Successful responses return a JWT. The frontend stores it locally and sends it as a bearer token on protected requests.

## Create a project

```http
POST /project/create
Authorization: Bearer <jwt>
Content-Type: application/json
```

```json
{
  "projectName": "Community data dashboard",
  "projectDescription": "Build a dashboard for local community insights.",
  "projectLocation": "Sydney",
  "projectSkills": ["Coding", "Data Analysis"]
}
```

The API validates the authenticated company context before persisting the project.
