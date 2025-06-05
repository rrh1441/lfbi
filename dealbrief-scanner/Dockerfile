# ---------- build ----------
FROM node:20-slim AS build
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm ci --omit=dev --no-fund --no-audit
COPY api ./api
COPY workers ./workers
RUN npm run build

# ---------- runtime ----------
FROM node:20-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/api/server.js"]
