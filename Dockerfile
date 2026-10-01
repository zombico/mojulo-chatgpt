FROM node:22.14.0-bookworm-slim

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=8787
ENV MOJULO_HOME=/data/mojulo

VOLUME ["/data"]
EXPOSE 8787

CMD ["node", "src/server.js"]
