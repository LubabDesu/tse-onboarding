/**
 * User route requests.
 */

import express from "express";
import * as UserController from "src/controllers/user";
import * as UserValidator from "src/validators/user";

const router = express.Router();

router.get("/:id", UserController.getUser);

/**
 * TaskValidator.createTask serves as middleware for this route. This means
 * that instead of immediately serving up the route when the request is made,
 * Express firsts passes the request to TaskValidator.createTask.
 * TaskValidator.createTask processes the request and determines whether the
 * request should be sent through or an error should be thrown.
 */
router.post("/", UserValidator.createUser, UserController.createUser);
router.delete("/:id", UserController.removeUser);

export default router;
