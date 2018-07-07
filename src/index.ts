import "reflect-metadata";
import * as Hapi from "hapi";
import { createConnection } from "typeorm";
import { Dog } from "./entity/Dog";

import * as DogController from "./controllers/dogController";

const server = new Hapi.Server({
  port: 3000,
  host: "localhost"
});

(async () => {
  try {
    await server.start();

    createConnection()
      .then(async connection => {
        const dogsRepository = connection.getRepository(Dog);

        server.route({
          method: "GET",
          path: "/",
          handler: function(request, h) {
            return "hello world";
          }
        });

        server.route({
          method: "GET",
          path: "/dogs",
          handler: function(request, h) {
            return dogsRepository.find();
          }
        });

        server.route({
          method: "GET",
          path: "/dogs/{id}",
          handler: DogController.get
        });
        server.route({
          method: "POST",
          path: "/dogs",
          handler: DogController.create
        });

        server.route({
          method: "PUT",
          path: "/dogs/{id}",
          handler: DogController.update
        });

        server.route({
          method: "DELETE",
          path: "/dogs/{id}",
          handler: DogController.remove
        });
      })
      .catch(error => console.log(error));
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();
