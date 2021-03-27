FROM node:lts as build

WORKDIR /app
COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build



FROM node:lts-slim

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/dist/ormconfig.js /app/
COPY --from=build /app/dist/ormconfig.d.ts /app/
COPY --from=build /app/package*.json /app/
COPY --from=build /app/scripts /app/scripts
COPY --from=build /app/database /app/database

RUN yarn install --frozen-lockfile --production

CMD [ "/bin/sh","/app/scripts/run.sh" ]