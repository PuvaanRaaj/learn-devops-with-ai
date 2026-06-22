// Single source of truth for the learning path: projects, lessons, AI prompts
// and quizzes. The lesson *body* lives in markdown under /content; this file
// holds the structured metadata the app and tests rely on.

export interface QuizQuestion {
  /** The question text. */
  question: string;
  /** Answer options shown to the learner. */
  options: string[];
  /** Index into `options` of the correct answer. */
  answer: number;
  /** Shown after answering to reinforce the concept. */
  explanation: string;
}

export interface Lesson {
  /** Zero-padded order string, e.g. "00". */
  step: string;
  /** Markdown filename inside the project folder. */
  file: string;
  /** URL slug (filename without extension). */
  slug: string;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  optional?: boolean;
  /** Copy-pasteable AI prompt highlighted in the UI. */
  aiPrompt: string;
  /** Must be answered 100% correctly to complete the lesson. */
  quiz: QuizQuestion[];
}

export interface Project {
  id: string;
  number: number;
  name: string;
  emoji: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  hosting: string;
  keySkills: string;
  stretchGoal: string;
  overview: string;
  lessons: Lesson[];
}

export interface Curriculum {
  title: string;
  subtitle: string;
  focus: string;
  projects: Project[];
}

// Helper to derive slug from file at authoring time.
const slug = (file: string) => file.replace(/\.md$/, "");

const project1Lessons: Lesson[] = [
  {
    step: "00",
    file: "00-setup-wsl-ubuntu-docker.md",
    slug: slug("00-setup-wsl-ubuntu-docker.md"),
    title: "Install WSL, Ubuntu & Docker",
    category: "Setup",
    priority: "High",
    aiPrompt:
      "I'm on Windows and new to Docker. Walk me through installing WSL2, Ubuntu, and Docker step by step, and tell me how to verify each piece is working.",
    quiz: [
      {
        question: "On Windows, where does Docker run best for this course?",
        options: ["Directly on Windows", "Inside WSL2 + Ubuntu", "In a separate physical PC", "Only in the cloud"],
        answer: 1,
        explanation: "WSL2 lets you run a real Linux environment inside Windows, which is where Docker runs best.",
      },
      {
        question: "Which command verifies Docker is installed?",
        options: ["docker --status", "docker verify", "docker --version", "docker check"],
        answer: 2,
        explanation: "`docker --version` prints the installed Docker version, confirming it's available.",
      },
      {
        question: "Mac and Linux users should...",
        options: ["Install WSL too", "Skip the WSL-specific steps", "Use a Windows VM", "Stop the course"],
        answer: 1,
        explanation: "WSL is a Windows feature; Mac and Linux already have a native environment and skip those steps.",
      },
    ],
  },
  {
    step: "01",
    file: "01-choose-a-simple-app.md",
    slug: slug("01-choose-a-simple-app.md"),
    title: "Choose a simple app to containerize",
    category: "Dockerfile",
    priority: "High",
    aiPrompt:
      "Generate the smallest possible Node.js Express app with a single route that returns JSON, plus a /health route. Include package.json and index.js.",
    quiz: [
      {
        question: "What kind of app should you pick for this project?",
        options: ["A large microservice system", "A minimal app, e.g. one route returning JSON", "A desktop GUI app", "A mobile app"],
        answer: 1,
        explanation: "The focus is the Docker setup, so a minimal app (a single route) is ideal.",
      },
      {
        question: "Why keep the app minimal?",
        options: ["Docker can't run big apps", "So the focus stays on the Docker workflow, not app complexity", "To save disk space only", "Minimal apps are more secure"],
        answer: 1,
        explanation: "A small app keeps your attention on learning Docker rather than debugging app logic.",
      },
    ],
  },
  {
    step: "02",
    file: "02-basic-single-stage-dockerfile.md",
    slug: slug("02-basic-single-stage-dockerfile.md"),
    title: "Write a basic single-stage Dockerfile",
    category: "Dockerfile",
    priority: "High",
    aiPrompt:
      "Write a simple single-stage Dockerfile for a Node.js 20 Express app whose entry point is index.js on port 3000. Add a comment explaining each line.",
    quiz: [
      {
        question: "What does a Dockerfile describe?",
        options: ["A running container's logs", "Instructions to build an image", "A network configuration", "A database schema"],
        answer: 1,
        explanation: "A Dockerfile is the recipe Docker reads top-to-bottom to build an image.",
      },
      {
        question: "Why COPY package*.json before COPY . . ?",
        options: ["It's required syntax", "To let Docker cache the npm install layer", "To hide source code", "It makes the image bigger"],
        answer: 1,
        explanation: "Copying package files first lets Docker reuse the cached install layer when only source changes.",
      },
      {
        question: "What does `docker build -t my-docker-app .` do?",
        options: ["Runs the container", "Builds an image named my-docker-app from the current folder", "Pushes to Docker Hub", "Deletes old images"],
        answer: 1,
        explanation: "`-t` tags the image; the `.` is the build context (current folder).",
      },
    ],
  },
  {
    step: "03",
    file: "03-multi-stage-dockerfile.md",
    slug: slug("03-multi-stage-dockerfile.md"),
    title: "Refactor to multi-stage Dockerfile",
    category: "Dockerfile",
    priority: "High",
    aiPrompt:
      "Refactor my single-stage Node.js Dockerfile into a multi-stage build: a build stage that installs dependencies and a slim runtime stage that copies only what's needed.",
    quiz: [
      {
        question: "What is the main benefit of a multi-stage build?",
        options: ["Faster networking", "A smaller, cleaner final image", "Automatic deployment", "Built-in healthchecks"],
        answer: 1,
        explanation: "Only the artifacts you need are copied to the runtime stage, leaving build tools behind.",
      },
      {
        question: "A multi-stage build typically splits into which two phases?",
        options: ["Test and deploy", "Build and runtime", "Push and pull", "Dev and prod secrets"],
        answer: 1,
        explanation: "A build stage compiles/installs; a runtime stage holds only the final files.",
      },
    ],
  },
  {
    step: "04",
    file: "04-non-root-user.md",
    slug: slug("04-non-root-user.md"),
    title: "Add a non-root USER",
    category: "Dockerfile",
    priority: "High",
    aiPrompt:
      "Update my Dockerfile to create a non-root user called appuser and switch to it with USER before the CMD. Explain why running as root is a security risk.",
    quiz: [
      {
        question: "By default, processes inside a container run as which user?",
        options: ["appuser", "guest", "root", "nobody"],
        answer: 2,
        explanation: "Containers run as root by default, which is a security risk if the app is compromised.",
      },
      {
        question: "Where should the USER instruction go?",
        options: ["After CMD", "Before CMD, after creating the user", "It doesn't matter", "Only in docker-compose"],
        answer: 1,
        explanation: "You create the user, then switch to it with USER before the app starts (CMD).",
      },
      {
        question: "Why avoid running as root in production?",
        options: ["It's slower", "An attacker who breaks in gains full control inside the container", "Root can't access the network", "Docker forbids it"],
        answer: 1,
        explanation: "Least privilege limits the blast radius if the app is exploited.",
      },
    ],
  },
  {
    step: "05",
    file: "05-dockerignore.md",
    slug: slug("05-dockerignore.md"),
    title: "Create a .dockerignore file",
    category: "Dockerfile",
    priority: "Medium",
    aiPrompt:
      "Create a .dockerignore for a Node.js project that excludes node_modules, .env, .git, and log files. Explain how it differs from .gitignore.",
    quiz: [
      {
        question: "What does .dockerignore control?",
        options: ["Which files are pushed to Docker Hub", "Which files are excluded from the build context", "Container memory limits", "Network ports"],
        answer: 1,
        explanation: "It keeps files out of the build context Docker copies, like .gitignore for builds.",
      },
      {
        question: "Which of these is a good reason to ignore .env?",
        options: ["It speeds up tests", "To avoid leaking secrets into the image", "Docker can't read .env", "It's required by Node"],
        answer: 1,
        explanation: "Copying .env into the image could leak credentials — exclude it.",
      },
    ],
  },
  {
    step: "06",
    file: "06-healthcheck.md",
    slug: slug("06-healthcheck.md"),
    title: "Add a HEALTHCHECK",
    category: "Dockerfile",
    priority: "Medium",
    aiPrompt:
      "Add a HEALTHCHECK to my Dockerfile that curls http://localhost:3000/health and fails if it doesn't respond. Explain why orchestrators rely on healthchecks.",
    quiz: [
      {
        question: "What does a Docker HEALTHCHECK do?",
        options: ["Restarts the host", "Tells Docker how to test if the app is actually working", "Scans for vulnerabilities", "Encrypts traffic"],
        answer: 1,
        explanation: "It actively probes the app (e.g. a /health route) rather than just checking the process exists.",
      },
      {
        question: "Why does a HEALTHCHECK matter for orchestrators like ECS?",
        options: ["They bill by healthcheck", "They use it to decide if a container should receive traffic", "It's required to build", "It improves image size"],
        answer: 1,
        explanation: "Orchestrators route traffic only to healthy containers and replace unhealthy ones.",
      },
    ],
  },
  {
    step: "07",
    file: "07-docker-compose-app-only.md",
    slug: slug("07-docker-compose-app-only.md"),
    title: "Write docker-compose.yml (app only)",
    category: "Docker Compose",
    priority: "High",
    aiPrompt:
      "Write a docker-compose.yml that builds my app from the local Dockerfile, maps port 3000, and loads env vars from a .env file. Explain build vs image.",
    quiz: [
      {
        question: "What problem does Docker Compose solve?",
        options: ["Image scanning", "Defining and running multi-container setups with one command", "Writing Dockerfiles for you", "Hosting in the cloud"],
        answer: 1,
        explanation: "Compose describes services in one YAML file you start with `docker compose up`.",
      },
      {
        question: "What does `build: .` mean in a compose service?",
        options: ["Pull a prebuilt image", "Build the image from the Dockerfile in the current directory", "Run the build matrix", "Build only on push"],
        answer: 1,
        explanation: "`build: .` tells Compose to build from the local Dockerfile rather than pull an image.",
      },
    ],
  },
  {
    step: "08",
    file: "08-add-postgres.md",
    slug: slug("08-add-postgres.md"),
    title: "Add Postgres to docker-compose.yml",
    category: "Docker Compose",
    priority: "High",
    aiPrompt:
      "Add a postgres:16 service to my docker-compose.yml with a named volume for data persistence and depends_on using condition: service_healthy.",
    quiz: [
      {
        question: "Why add a named volume to the Postgres service?",
        options: ["To expose more ports", "So database data persists across container restarts", "To speed up the network", "To run as non-root"],
        answer: 1,
        explanation: "Without a volume, data is lost when the container is removed; a named volume persists it.",
      },
      {
        question: "What does `depends_on` with `condition: service_healthy` ensure?",
        options: ["The app waits until Postgres is actually ready", "Postgres uses less memory", "The image is smaller", "Secrets are encrypted"],
        answer: 0,
        explanation: "It delays starting the app until Postgres reports healthy, avoiding connection errors.",
      },
    ],
  },
  {
    step: "09",
    file: "09-wire-app-to-postgres.md",
    slug: slug("09-wire-app-to-postgres.md"),
    title: "Wire app to Postgres via env vars",
    category: "Docker Compose",
    priority: "High",
    aiPrompt:
      "Update my Node.js app to read DB_HOST, DB_PORT, DB_USER and DB_PASSWORD from process.env and connect to Postgres. Never hardcode credentials.",
    quiz: [
      {
        question: "In Compose, what hostname does the app use to reach the db service?",
        options: ["localhost", "127.0.0.1", "the service name (e.g. db)", "the public IP"],
        answer: 2,
        explanation: "Compose creates a network where services reach each other by service name.",
      },
      {
        question: "Where should database credentials come from?",
        options: ["Hardcoded in code", "Environment variables / .env, never hardcoded", "The Dockerfile", "A public gist"],
        answer: 1,
        explanation: "Real apps read secrets from environment variables, keeping them out of source code.",
      },
    ],
  },
  {
    step: "10",
    file: "10-push-to-docker-hub.md",
    slug: slug("10-push-to-docker-hub.md"),
    title: "Push image to Docker Hub",
    category: "Registry",
    priority: "High",
    aiPrompt:
      "Show me how to tag my image as username/myapp:v1.0.0 and push it to Docker Hub, plus when to also push a :latest tag. Explain semantic versioning briefly.",
    quiz: [
      {
        question: "What is a container registry?",
        options: ["A log viewer", "A storage service for Docker images", "A type of volume", "A CI tool"],
        answer: 1,
        explanation: "A registry (like Docker Hub) stores and distributes images — GitHub, but for images.",
      },
      {
        question: "Which tag follows semantic versioning?",
        options: ["myapp:newest", "username/myapp:v1.0.0", "myapp:final", "myapp:prod-ish"],
        answer: 1,
        explanation: "`v1.0.0` (MAJOR.MINOR.PATCH) is a semantic version; `latest` is a moving pointer.",
      },
    ],
  },
  {
    step: "11",
    file: "11-push-to-ghcr.md",
    slug: slug("11-push-to-ghcr.md"),
    title: "Push to GHCR",
    category: "Registry",
    priority: "Low",
    optional: true,
    aiPrompt:
      "Show me how to authenticate to ghcr.io with a GitHub token via --password-stdin and push my image as ghcr.io/username/myapp:latest.",
    quiz: [
      {
        question: "What is GHCR?",
        options: ["A GitHub CI runner", "GitHub Container Registry — stores images in your GitHub account", "A code linter", "A secrets manager"],
        answer: 1,
        explanation: "GHCR keeps your images alongside your code in GitHub.",
      },
      {
        question: "What's the safest way to pass a token to `docker login`?",
        options: ["Type it in the command", "Use --password-stdin so it isn't in shell history", "Put it in the Dockerfile", "Email it to yourself"],
        answer: 1,
        explanation: "`--password-stdin` avoids leaving the token in your shell history or process list.",
      },
    ],
  },
  {
    step: "12",
    file: "12-deploy-to-render.md",
    slug: slug("12-deploy-to-render.md"),
    title: "Deploy to Render",
    category: "Hosting & Deploy",
    priority: "Low",
    optional: true,
    aiPrompt:
      "Walk me through deploying a Dockerized web service to Render's free tier using 'Deploy from Dockerfile', connected to my GitHub repo.",
    quiz: [
      {
        question: "How does Render run your app in this lesson?",
        options: ["You upload a zip", "It auto-detects and builds from your Dockerfile", "You SSH in and install manually", "It only runs static sites"],
        answer: 1,
        explanation: "Render can deploy directly from your Dockerfile — no server management needed.",
      },
    ],
  },
  {
    step: "13",
    file: "13-render-env-vars.md",
    slug: slug("13-render-env-vars.md"),
    title: "Configure env vars on Render",
    category: "Hosting & Deploy",
    priority: "Low",
    optional: true,
    aiPrompt:
      "Show me how to set environment variables and secrets in Render's dashboard for my Dockerized service, and how the app reads them.",
    quiz: [
      {
        question: "Where do you set production secrets on Render?",
        options: ["In the Dockerfile", "In the Render dashboard's environment settings", "In .env committed to git", "In the image tag"],
        answer: 1,
        explanation: "Host platforms inject env vars/secrets at runtime via their dashboard — not committed to git.",
      },
    ],
  },
  {
    step: "14",
    file: "14-verify-live.md",
    slug: slug("14-verify-live.md"),
    title: "Trigger deploy & verify live",
    category: "Hosting & Deploy",
    priority: "Low",
    optional: true,
    aiPrompt:
      "After pushing a change, how do I trigger a Render deploy and verify the live URL is serving the new version? What should I check in the logs?",
    quiz: [
      {
        question: "After deploying, a good way to confirm success is to...",
        options: ["Restart your laptop", "Open the live URL and check logs for a healthy start", "Delete the image", "Rebuild locally only"],
        answer: 1,
        explanation: "Verify the public URL responds and the deploy logs show a clean, healthy startup.",
      },
    ],
  },
  {
    step: "15",
    file: "15-render-managed-postgres.md",
    slug: slug("15-render-managed-postgres.md"),
    title: "Add managed Postgres on Render",
    category: "Hosting & Deploy",
    priority: "Low",
    optional: true,
    aiPrompt:
      "Show me how to create a managed Postgres database on Render and connect my deployed web service to it using the internal connection string.",
    quiz: [
      {
        question: "What's an advantage of managed Postgres on Render?",
        options: ["You patch and back it up manually", "The platform handles provisioning, backups, and connection details", "It only works locally", "It removes the need for env vars"],
        answer: 1,
        explanation: "A managed database is run for you; you connect via the provided connection string.",
      },
    ],
  },
];

const project2Lessons: Lesson[] = [
  {
    step: "00",
    file: "00-what-is-cicd.md",
    slug: slug("00-what-is-cicd.md"),
    title: "What is CI/CD?",
    category: "Concepts",
    priority: "High",
    aiPrompt:
      "Explain CI/CD to me like I'm new to DevOps. What's the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment? Give one concrete Node.js example.",
    quiz: [
      {
        question: "What does Continuous Integration (CI) primarily do?",
        options: ["Deploys to production", "Automatically builds and tests code on every push", "Manages secrets", "Provisions servers"],
        answer: 1,
        explanation: "CI catches broken code early by building and testing automatically on each change.",
      },
      {
        question: "In GitHub Actions, where do workflow files live?",
        options: [".github/workflows/", "ci/jobs/", ".actions/", "workflows.yml at the root"],
        answer: 0,
        explanation: "Any `.yml` in `.github/workflows/` is picked up automatically by GitHub.",
      },
      {
        question: "A 'job' is made up of...",
        options: ["Multiple workflows", "A set of steps that run on one runner", "Several repositories", "Only secrets"],
        answer: 1,
        explanation: "A job is a sequence of steps executed on a single runner machine.",
      },
    ],
  },
  {
    step: "01",
    file: "01-first-workflow.md",
    slug: slug("01-first-workflow.md"),
    title: "Create your first workflow",
    category: "Workflows",
    priority: "High",
    aiPrompt:
      "Write a minimal GitHub Actions workflow that runs on every push, checks out the code with actions/checkout@v4, and prints 'Hello CI'. Explain each line.",
    quiz: [
      {
        question: "Which key defines what triggers a workflow?",
        options: ["run:", "on:", "uses:", "needs:"],
        answer: 1,
        explanation: "`on:` specifies the events (push, pull_request, schedule…) that start a workflow.",
      },
      {
        question: "What does `uses: actions/checkout@v4` do?",
        options: ["Runs your tests", "Checks out your repository code onto the runner", "Deploys the app", "Logs into Docker Hub"],
        answer: 1,
        explanation: "The checkout action clones your repo so later steps can access the code.",
      },
    ],
  },
  {
    step: "02",
    file: "02-run-tests-on-push.md",
    slug: slug("02-run-tests-on-push.md"),
    title: "Run tests on every push",
    category: "Workflows",
    priority: "High",
    aiPrompt:
      "Update my workflow to set up Node.js 20, install deps with npm ci, and run npm test. Explain why npm ci is preferred over npm install in CI.",
    quiz: [
      {
        question: "Why use `npm ci` instead of `npm install` in CI?",
        options: ["It's shorter to type", "It installs exact lockfile versions and is reproducible", "It skips tests", "It auto-publishes"],
        answer: 1,
        explanation: "`npm ci` installs exactly what's in package-lock.json and fails if it's out of sync — perfect for CI.",
      },
      {
        question: "What happens to a pull request if a test fails in CI?",
        options: ["It merges anyway", "The run goes red, signaling the change is broken", "GitHub deletes the branch", "Nothing is reported"],
        answer: 1,
        explanation: "A failing test turns the run red so reviewers know not to merge.",
      },
    ],
  },
  {
    step: "03",
    file: "03-build-matrix.md",
    slug: slug("03-build-matrix.md"),
    title: "Test across versions with a matrix",
    category: "Workflows",
    priority: "Medium",
    aiPrompt:
      "Add a build matrix so my tests run on Node.js 18, 20, and 22 in parallel. Explain how matrix and ${{ matrix.node }} work.",
    quiz: [
      {
        question: "What does a build matrix let you do?",
        options: ["Encrypt secrets", "Run the same job across multiple configurations in parallel", "Cache Docker layers", "Deploy to many servers"],
        answer: 1,
        explanation: "A matrix fans one job out into parallel runs, e.g. one per language version.",
      },
      {
        question: "What does `fail-fast: false` change?",
        options: ["Stops all runs on first failure", "Lets other matrix runs finish even if one fails", "Disables caching", "Skips the tests"],
        answer: 1,
        explanation: "With fail-fast off, you see results for every version instead of stopping at the first failure.",
      },
    ],
  },
  {
    step: "04",
    file: "04-build-docker-image.md",
    slug: slug("04-build-docker-image.md"),
    title: "Build your Docker image in CI",
    category: "Docker in CI",
    priority: "High",
    aiPrompt:
      "Write a GitHub Actions job that builds my Docker image from the Dockerfile using docker/build-push-action without pushing it, tagged myapp:ci.",
    quiz: [
      {
        question: "What does `push: false` mean in build-push-action?",
        options: ["Skip the build", "Build the image but don't upload it to a registry", "Push only on main", "Delete the image after"],
        answer: 1,
        explanation: "It verifies the image builds without publishing it anywhere yet.",
      },
      {
        question: "Why build the Docker image in CI at all?",
        options: ["To slow down merges", "To catch a broken Dockerfile before anyone deploys", "To replace tests", "To store logs"],
        answer: 1,
        explanation: "Building in CI ensures the image still compiles on every change.",
      },
    ],
  },
  {
    step: "05",
    file: "05-secrets-and-env.md",
    slug: slug("05-secrets-and-env.md"),
    title: "Secrets & environment variables",
    category: "Security",
    priority: "High",
    aiPrompt:
      "Explain the difference between a GitHub Actions repository secret, a variable, and the built-in GITHUB_TOKEN, and when to use each.",
    quiz: [
      {
        question: "How do you reference a repository secret in a workflow?",
        options: ["${{ env.SECRET }}", "${{ secrets.NAME }}", "$SECRET", "secret(NAME)"],
        answer: 1,
        explanation: "Secrets are accessed via the `secrets` context: `${{ secrets.NAME }}`.",
      },
      {
        question: "Why should tokens never be written directly in the YAML?",
        options: ["YAML can't store strings", "The workflow file is visible in the repo, exposing the secret", "It slows the build", "GitHub blocks long lines"],
        answer: 1,
        explanation: "Workflow files are part of the repo; secrets belong in encrypted settings, not the YAML.",
      },
    ],
  },
  {
    step: "06",
    file: "06-push-image-to-ghcr.md",
    slug: slug("06-push-image-to-ghcr.md"),
    title: "Push your image to GHCR from Actions",
    category: "Docker in CI",
    priority: "High",
    aiPrompt:
      "Write a job that, only on pushes to main, builds and pushes my image to ghcr.io/OWNER/REPO using the built-in GITHUB_TOKEN, tagged latest and the commit SHA.",
    quiz: [
      {
        question: "What does `if: github.ref == 'refs/heads/main'` achieve?",
        options: ["Runs on every branch", "Restricts the job to pushes on the main branch", "Disables the job", "Runs only on tags"],
        answer: 1,
        explanation: "The condition ensures publishing happens only from main, not feature branches or PRs.",
      },
      {
        question: "Which permission lets GITHUB_TOKEN push to GHCR?",
        options: ["contents: write", "packages: write", "issues: write", "actions: read"],
        answer: 1,
        explanation: "`packages: write` grants the token permission to publish container images.",
      },
      {
        question: "Why tag an image with `${{ github.sha }}`?",
        options: ["It's required by Docker", "To give every build a unique, traceable tag", "To make it smaller", "To skip caching"],
        answer: 1,
        explanation: "The commit SHA uniquely identifies exactly which code produced that image.",
      },
    ],
  },
  {
    step: "07",
    file: "07-caching.md",
    slug: slug("07-caching.md"),
    title: "Speed up builds with caching",
    category: "Optimization",
    priority: "Medium",
    aiPrompt:
      "Add GitHub Actions caching to my Docker build using cache-from and cache-to of type gha so unchanged layers are reused. Explain how layer caching saves time.",
    quiz: [
      {
        question: "What does Docker layer caching reuse between runs?",
        options: ["Secrets", "Unchanged image layers, so they aren't rebuilt", "Test results", "The runner OS"],
        answer: 1,
        explanation: "Caching reuses layers that didn't change, making repeat builds much faster.",
      },
      {
        question: "How do you enable npm caching with setup-node?",
        options: ["cache: \"npm\"", "npm: true", "useCache: yes", "Nothing, it's automatic"],
        answer: 0,
        explanation: "Setting `cache: \"npm\"` on actions/setup-node caches the npm download directory.",
      },
    ],
  },
  {
    step: "08",
    file: "08-deploy-on-merge.md",
    slug: slug("08-deploy-on-merge.md"),
    title: "Deploy automatically on merge to main",
    category: "Continuous Deployment",
    priority: "High",
    aiPrompt:
      "Show me how to trigger a Render deploy from GitHub Actions using a deploy hook URL stored as a secret, only after my publish job succeeds, using needs: to chain jobs.",
    quiz: [
      {
        question: "What does `needs: publish` do for the deploy job?",
        options: ["Runs deploy first", "Makes deploy wait for and depend on the publish job", "Skips publish", "Runs them in parallel"],
        answer: 1,
        explanation: "`needs:` chains jobs so deploy runs only after publish succeeds.",
      },
      {
        question: "Triggering a Render deploy hook is done by...",
        options: ["Pushing a tag", "Sending an HTTP request (curl) to the secret hook URL", "Emailing Render", "Editing the Dockerfile"],
        answer: 1,
        explanation: "Hitting the deploy hook URL tells Render to pull the latest image and redeploy.",
      },
    ],
  },
  {
    step: "09",
    file: "09-badges-and-branch-protection.md",
    slug: slug("09-badges-and-branch-protection.md"),
    title: "Status badges & branch protection",
    category: "Polish",
    priority: "Low",
    optional: true,
    aiPrompt:
      "Give me the markdown for a GitHub Actions status badge for a workflow named CI, and explain how to make CI a required status check on main.",
    quiz: [
      {
        question: "What does requiring a status check on main accomplish?",
        options: ["Speeds up CI", "Blocks merging a PR until CI passes", "Deletes failing branches", "Disables PRs"],
        answer: 1,
        explanation: "Branch protection makes a green CI check mandatory before the merge button works.",
      },
    ],
  },
];

export const curriculum: Curriculum = {
  title: "🐳 DevOps Learning Path",
  subtitle:
    "A structured, project-based DevOps curriculum focused on containerization, cloud-native deployments, and infrastructure best practices.",
  focus: "Docker · CI/CD · ECS/Fargate · Serverless · free-tier hosting",
  projects: [
    {
      id: "01-dockerize-a-simple-web-app",
      number: 1,
      name: "Dockerize a Simple Web App",
      emoji: "🟢",
      difficulty: "Beginner",
      hosting: "Render",
      keySkills:
        "Multi-stage Dockerfile, non-root user, .dockerignore, Docker Compose, image push (Docker Hub / GHCR)",
      stretchGoal:
        "Add docker-compose.yml with Postgres + app wired together, named volumes and healthchecks",
      overview:
        "Take a simple web application and package it into a Docker container — the same way real companies ship software to production. This is the foundation of everything in DevOps.",
      lessons: project1Lessons,
    },
    {
      id: "02-cicd-with-github-actions",
      number: 2,
      name: "CI/CD with GitHub Actions",
      emoji: "🟡",
      difficulty: "Intermediate",
      hosting: "GHCR + Render",
      keySkills:
        "Workflows, build matrix, automated tests, Docker build/push in CI, secrets, layer caching, deploy on merge",
      stretchGoal:
        "Add status badges and branch protection so a red pipeline blocks merging to main",
      overview:
        "Automate everything you did by hand in Project 1. Build a pipeline that tests, builds, and ships your container on every push — the way professional teams deliver software.",
      lessons: project2Lessons,
    },
  ],
};

// ---- Lookup helpers (used by the app and unit tests) ----

export function getProject(id: string): Project | undefined {
  return curriculum.projects.find((p) => p.id === id);
}

export function getLesson(projectId: string, slug: string): Lesson | undefined {
  return getProject(projectId)?.lessons.find((l) => l.slug === slug);
}

export interface FlatLesson {
  projectId: string;
  projectName: string;
  lesson: Lesson;
}

/** Every lesson across all projects, in learning order. */
export function flatLessons(): FlatLesson[] {
  const out: FlatLesson[] = [];
  for (const p of curriculum.projects) {
    for (const lesson of p.lessons) {
      out.push({
        projectId: p.id,
        projectName: `${p.emoji} Project ${p.number} — ${p.name}`.trim(),
        lesson,
      });
    }
  }
  return out;
}

/** Stable key used for routing and progress storage. */
export function lessonKey(projectId: string, slug: string): string {
  return `${projectId}/${slug}`;
}

/** Total number of lessons (used for global progress). */
export function totalLessons(): number {
  return curriculum.projects.reduce((n, p) => n + p.lessons.length, 0);
}
