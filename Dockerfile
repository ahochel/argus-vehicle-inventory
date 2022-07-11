#
#   Frontend build
#
FROM node:16.16.0-alpine as frontend
WORKDIR /tmp/app

# Create cached layer with node_modules only
COPY ./frontend/package*.json ./
RUN npm ci --quiet


# Copy whole App to make a build
COPY ./frontend .
RUN npm run build



#
#   Backend build
#
FROM node:16.16.0-alpine as backend
WORKDIR /tmp/app

# Create cached layer with node_modules only
COPY ./backend/package*.json ./
RUN npm ci --quiet

# Copy whole App to make a build
COPY ./backend .

RUN npm run build

# Remove devDependencies after build
RUN npm prune --production



#
#   Destination image build
#
FROM node:16.16.0-alpine as vehicle-inventory

WORKDIR /usr/src/app

# Copy necessary files from build images
COPY --from=backend /tmp/app/build ./
COPY --from=backend /tmp/app/node_modules ./node_modules
COPY --from=frontend /tmp/app/build ./public

CMD node index.js
