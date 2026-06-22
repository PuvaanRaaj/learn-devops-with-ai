# 00 — Setup: Install WSL, Ubuntu & Docker

> **Category:** Setup · **Priority:** High · **Step:** 1
>
> Prerequisites before any Docker work. Windows users must set up WSL2 + Ubuntu. Mac/Linux users skip the WSL steps.

> 💻 **Who is this for?** If you are on **Windows**, follow this entire guide. If you are on **Mac** or **Linux**, skip to Step 4.

## 🎯 What is this task?

Before you can run Docker, you need the right environment set up on your computer. On Windows, Docker runs best inside **WSL2** (Windows Subsystem for Linux) — a feature that lets you run a real Linux system inside Windows without a virtual machine. You'll install Ubuntu (a popular Linux version) inside WSL2, then install Docker inside that Ubuntu environment.

Think of it like this: Windows is the house, WSL2 is a room inside the house, and Ubuntu is the furniture in that room. Docker lives in that room.

## ✅ Prerequisites

- Windows 10 version 2004 or higher, or Windows 11
- At least 8GB RAM recommended
- Internet connection

To check your Windows version: press `Windows + R`, type `winver`, press Enter.

## 💻 Step-by-step (Windows)

### Step 1 — Enable WSL2

Open **PowerShell as Administrator** (right-click the Start button → "Windows PowerShell (Admin)") and run:

```powershell
wsl --install
```

This single command:
- Enables the WSL feature
- Enables the Virtual Machine Platform
- Downloads and installs the latest Linux kernel
- Sets WSL2 as the default version
- Installs Ubuntu automatically

**Restart your computer when prompted.**

### Step 2 — Set up Ubuntu

After restarting, Ubuntu will open automatically and ask you to create a username and password.

- Username: pick something simple like `puvaan` or `devuser` (lowercase, no spaces)
- Password: type it carefully (you won't see characters as you type — this is normal)
- Confirm password

> ⚠️ Remember this password. You'll need it when Ubuntu asks for `sudo` permission.

### Step 3 — Verify WSL2 is installed correctly

Open PowerShell (normal, not admin) and run:

```powershell
wsl --list --verbose
```

You should see output like:

```text
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

The `VERSION` must be `2`. If it says `1`, run:

```powershell
wsl --set-version Ubuntu 2
```

### Step 4 — Update Ubuntu packages

Open your **Ubuntu terminal** (search "Ubuntu" in Start menu, or type `wsl` in PowerShell). Run these commands one by one:

```bash
sudo apt update
sudo apt upgrade -y
```

This updates the list of available packages and installs any pending updates. It may take a few minutes.

### Step 5 — Install required dependencies

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
```

These are tools needed for the Docker installation to work correctly.

### Step 6 — Add Docker's official GPG key

A GPG key lets your system verify that Docker packages are genuine and not tampered with.

```bash
sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### Step 7 — Add Docker's repository to apt sources

This tells Ubuntu where to download Docker from:

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Then update the package list again:

```bash
sudo apt update
```

### Step 8 — Install Docker Engine

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

This installs:
- `docker-ce` — the Docker engine itself
- `docker-ce-cli` — the `docker` command you'll type in terminal
- `containerd.io` — the container runtime
- `docker-buildx-plugin` — for multi-platform builds
- `docker-compose-plugin` — for `docker compose` commands (v2)

### Step 9 — Start Docker and enable it on boot

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

`enable` means Docker will start automatically every time you open Ubuntu.

### Step 10 — Add your user to the Docker group

By default, only `root` can run Docker commands. This step lets your regular user run Docker without typing `sudo` every time:

```bash
sudo usermod -aG docker $USER
```

Then **close and reopen your Ubuntu terminal** (this is required for the group change to take effect).

### Step 11 — Verify Docker is working

```bash
docker --version
docker compose version
```

You should see something like:

```text
Docker version 26.x.x, build xxxxxxx
Docker Compose version v2.x.x
```

Now run the official Docker test container:

```bash
docker run hello-world
```

You should see a message that starts with `Hello from Docker!`. If you see this, **Docker is working correctly**.

## 🍎 Mac Users (skip WSL, start here)

1. Go to <https://www.docker.com/products/docker-desktop>
2. Download **Docker Desktop for Mac** (choose Apple Silicon if M1/M2/M3/M4, or Intel if older)
3. Open the `.dmg` file and drag Docker to Applications
4. Open Docker from Applications and wait for it to start
5. Open **Terminal** and run `docker --version` to verify

## 🌧️ Linux Users (not WSL)

Follow the same steps 4–11 above (you already have a native Linux terminal).

## 🤖 AI Prompt for troubleshooting

> "I am setting up Docker on Ubuntu inside WSL2 on Windows. I ran this command: \[paste command\]. I got this error: \[paste error\]. Please explain what the error means and give me the exact commands to fix it step by step."

## ✅ Done when

- [ ] WSL2 is installed and Ubuntu shows `VERSION 2` in `wsl --list --verbose`
- [ ] Ubuntu username and password are set up
- [ ] `docker --version` shows a version number
- [ ] `docker compose version` shows a version number
- [ ] `docker run hello-world` prints the Hello from Docker message
- [ ] Docker runs **without** `sudo` (no permission errors)
