# 02 — Write a basic single-stage Dockerfile

> **Category:** Dockerfile · **Priority:** High · **Step:** 3
>
> Get it working first. Use the official `node:20` (or `python:3.12`) base image.

## 🎯 What is this task?

A `Dockerfile` is a recipe that tells Docker how to package your app into a container. Think of it like a shopping list + cooking instructions — Docker reads it top to bottom and builds an image. In this task, you write a simple first version.

## 🤖 AI Prompt

> "Write a simple single-stage Dockerfile for a Node.js Express app. The app entry point is `index.js`, it runs on port 3000, and uses Node.js 20. Include comments explaining each line."

## 📋 Step-by-step

**Step 1 — Make sure Docker is installed**

```bash
docker --version
```

You should see something like `Docker version 24.x.x`.

**Step 2 — Create the Dockerfile**

In your project folder (`my-docker-app`), create a new file called exactly `Dockerfile` (no extension):

```dockerfile
# Use the official Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first (so Docker can cache the npm install step)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Tell Docker this app listens on port 3000
EXPOSE 3000

# The command to run when the container starts
CMD ["node", "index.js"]
```

**Step 3 — Build the image**

```bash
docker build -t my-docker-app .
```

- `-t my-docker-app` gives your image a name (tag)
- The `.` at the end means "look for the Dockerfile in the current folder"

You'll see Docker downloading the Node.js base image and running each step. This is normal and only takes long on the first run.

**Step 4 — Run the container**

```bash
docker run -p 3000:3000 my-docker-app
```

- `-p 3000:3000` maps port 3000 on your computer to port 3000 inside the container

Open `http://localhost:3000` in your browser — it should work exactly like before!

**Step 5 — Stop the container**

Press `Ctrl+C`, or open a new terminal and run:

```bash
docker ps
docker stop <container_id>
```

## ✅ Done when

- [ ] `Dockerfile` exists in your project folder
- [ ] `docker build -t my-docker-app .` completes without errors
- [ ] `docker run -p 3000:3000 my-docker-app` starts the server
- [ ] `http://localhost:3000` responds in the browser
