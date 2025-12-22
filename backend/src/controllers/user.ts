/**
 * Functions that process task route requests.
 */

import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";
type CreateUserBody = {
  name: string;
  profilePictureURL?: string;
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the ID doesn't exist, then findById returns null
    const user = await UserModel.findById(id);

    if (user === null) {
      throw createHttpError(404, "Task not found.");
    }

    // Set the status code (200) and body (the task object as JSON) of the response.
    // Note that you don't need to return anything, but you can still use a return
    // statement to exit the function early.
    res.status(200).json(user);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body as CreateUserBody;

  try {
    validationErrorParser(errors);
    const user = await UserModel.create({
      name,
      profilePictureURL,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const removeUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.deleteOne({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
