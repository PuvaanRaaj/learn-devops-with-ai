# 10 — Push image to Docker Hub

> **Category:** Registry · **Priority:** High
>
> Tag correctly: `docker tag myapp yourusername/myapp:v1.0.0`. Learn semantic versioning. Also try the `latest` tag.

## 🎯 What is this task?

A Docker image is built on your computer, but to share it or deploy it to the cloud, you need to push it to a **registry** — a storage service for Docker images. Docker Hub is the most popular free option (like GitHub, but for Docker images).

## 🤖 AI Prompt

> "Explain step by step how to tag a local Docker image and push it to Docker Hub. The local image is called `my-docker-app`. My Docker Hub username is `yourusername`. Show the exact commands for: logging in, tagging with a version and latest, pushing, and then pulling it back to verify."

## 📋 Step-by-step

**Step 1 — Create a Docker Hub account**

Go to <https://hub.docker.com> and sign up for a free account. Remember your username.

**Step 2 — Log in to Docker Hub from terminal**

```bash
docker login
```

Enter your Docker Hub username and password when prompted. You should see `Login Succeeded`.

**Step 3 — Tag your image**

Docker images need to be tagged with your username before pushing. Replace `yourusername` with your actual Docker Hub username:

```bash
docker tag my-docker-app:v5 yourusername/my-docker-app:v1.0.0
docker tag my-docker-app:v5 yourusername/my-docker-app:latest
```

You now have two tags for the same image — a specific version and `latest`.

**Step 4 — Push to Docker Hub**

```bash
docker push yourusername/my-docker-app:v1.0.0
docker push yourusername/my-docker-app:latest
```

You'll see progress bars as each layer uploads. After it completes, go to `https://hub.docker.com/r/yourusername/my-docker-app` in your browser — your image should appear there.

**Step 5 — Verify by pulling it back**

Delete your local copy and pull it from Docker Hub to confirm it works:

```bash
docker rmi yourusername/my-docker-app:latest
docker pull yourusername/my-docker-app:latest
docker run -p 3000:3000 yourusername/my-docker-app:latest
```

Open `http://localhost:3000` — it should work, now running from the cloud-pulled image.

## 💡 Good habits for image tagging

- Use semantic versioning: `v1.0.0`, `v1.1.0`, `v2.0.0`
- Always also tag as `latest` for convenience
- Never push images with secrets or credentials baked in

## ✅ Done when

- [ ] Docker Hub account created
- [ ] `docker login` succeeds
- [ ] Image pushed to `yourusername/my-docker-app:v1.0.0` and `latest`
- [ ] Image visible on [hub.docker.com](https://hub.docker.com)
- [ ] `docker pull yourusername/my-docker-app:latest` works from terminal
