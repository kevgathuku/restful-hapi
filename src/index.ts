import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

const Hapi = require("hapi");
const mongoose = require("mongoose");
const DogController = require("./controllers/dogController");
const MongoDBUrl = "mongodb://localhost:27017/dogapi";

const server = new Hapi.Server({
  port: 3000,
  host: "localhost"
});

server.route({
  method: "GET",
  path: "/",
  handler: function (request, h) {
    return "hello world";
  }
});

server.route({
  method: "GET",
  path: "/dogs",
  handler: DogController.list
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

(async () => {
  try {
    await server.start();
    // Once started, connect to Mongo through Mongoose
    mongoose
      .connect(
        MongoDBUrl,
        {}
      )
      .then(
        () => {
          console.log(`Connected to Mongo server`);
        },
        err => {
          console.log(err);
        }
      );


    createConnection()
      .then(async connection => {
        console.log("Inserting a new user into the database...");
        const user = new User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);

        console.log("Loading users from the database...");
        const users = await connection.manager.find(User);
        console.log("Loaded users: ", users);

        console.log("Here you can setup and run express/koa/any other framework.");
      })
      .catch(error => console.log(error));
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();
