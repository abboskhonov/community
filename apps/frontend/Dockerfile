FROM node:20

# Install pnpm globally via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lockfile and config files first (for layer caching)
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY tsconfig.json ./
COPY vite.config.* ./


# Install dependencies
RUN pnpm install

# Copy remaining project files
COPY . .

# Build app
RUN pnpm build

# Expose preview port
EXPOSE 3000
CMD ["pnpm", "preview", "--port", "3000", "--host", "0.0.0.0"]
