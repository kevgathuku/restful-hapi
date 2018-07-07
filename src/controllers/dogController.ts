import * as _ from "lodash";
import { getRepository } from "typeorm";
import { Dog } from "../entity/Dog";

/**
 * Get Dog by ID
 */
export const get = (req, h) => {
  return getRepository(Dog)
    .findOne({ id: req.params.id })
    .then(dog => {
      if (!dog) return { message: "Dog not Found" };
      return { dog };
    })
    .catch(err => {
      return { err };
    });
};

/**
 * POST a Dog
 */
export const create = (req, h) => {
  const dogData = {
    name: req.payload.name,
    breed: req.payload.breed,
    age: req.payload.age,
    image: req.payload.image
  };

  return getRepository(Dog)
    .insert(dogData)
    .then(dog => {
      return { message: "Dog created successfully", dog: dogData };
    })
    .catch(err => {
      return { err };
    });
};

/**
 * PUT | Update Dog by ID
 */
export const update = async (req, h) => {
  const dogData = {
    name: req.payload.name,
    breed: req.payload.breed,
    age: req.payload.age,
    image: req.payload.image
  };

  const validDogData = _.omitBy(dogData, _.isUndefined);

  return getRepository(Dog)
    .update({ id: req.params.id }, validDogData)
    .then(dog => {
      return { message: "Dog updated successfully", dog: dogData };
    })
    .catch(err => {
      return { err };
    });
};

/**
 * Delete Dog by ID
 */
export const remove = (req, h) => {
  return getRepository(Dog)
    .delete(req.params.id)
    .then(() => {
      return { success: true };
    })
    .catch(err => {
      return { err };
    });
};
