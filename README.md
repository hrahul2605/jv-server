# API for Just Vote

_This repository contains all the server logic for [jv-client]((https://github.com/hrahul2605/jv-client))_

- Visit Just Vote at [https://jv.hrahul2605.tech](https://jv.hrahul2605.tech)

## Running the server

- Copy [sample.env](https://github.com/hrahul2605/jv-server/blob/main/sample.env) to `.env` and fill the environment variables

- ```bash
  # install all the dependancies
  $ yarn install

  # start the development server
  $ yarn start:dev
    
  # start the production server
  $ yarn start:prod

  ```

- From Docker image  
  - ```bash
    $ docker pull ghcr.io/hrahul2605/jv-server:latest
    ```
  - Run the image providing the `.env` file to the image.


## Running Migrations

```bash
# generate the migration
yarn migration:generate MIGRATION_NAME

# migrate
yarn migrate
```