# Building and running the app in the pipeline.

## Example 1.

Both Backend and Frontend are located under `/app` .  The app builds with the `build_app` command and runs with the `run_app` command.

```json
{
  "build:fullstack": "cd app && build_app",
  "start:fullstack": "cd app && run_app"
}
```

## Example 2.

Backend is located under `/backend`.  It builds with the `build_backend` command and runs with the `run_backend` command.

Frontend is located under `/frontend`.  It builds with the `build_frontend` command and runs with the `run_frontend` command.

```json
{
  "build:backend": "cd backend && build_backend",
  "build:frontend": "cd frontend && build_frontend",
  "build:fullstack": "yarn run build:backend && yarn run build:frontend",
  "start:backend": "cd backend && run_backend",
  "start:frontend": "cd frontend && run_frontend",
  "start:fullstack": "yarn run start:backend & yarn run start:frontend"
}
```
