# Small, real Node.js build — no build step beyond installing dependencies,
# so a single stage is enough (a compiled frontend, e.g. Angular, would add
# a build stage here and copy only its output into the final image).
FROM node:20-alpine

WORKDIR /app

# Dependencies first so this layer only rebuilds when they actually change,
# not on every source edit.
COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY public ./public

# Never run as root inside the container — node:alpine already ships a
# non-root "node" user, so this is a one-line switch, not a new user to
# manage.
USER node

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
