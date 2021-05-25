# Backend Project with NestJS and Jest
This project uses dotenv to set the environment variables, but with docker, docker-compose and k8s it is not necessary the .env file. 

# Configure Environment Variables
This project has a file called .env.example that instructs what are the necessary env variables in the .env file

# Development inside a remote container
### Require docker*
- Install docker extensio pack in VSCode
- Install Remote - Containers in VSCode
- Create .env file
- Open Container in project root folder


# Run Application in Development Environment
```bash
  yarn start:dev
  or
  npm run start:dev
```

# Build Application
```bash
  yarn build
  or
  npm run build
```

# Run Application in Production Envinroment
```bash
  yarn start:prod
  or
  npm run start:prod
```
