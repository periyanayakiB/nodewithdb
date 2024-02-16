import express from "express";
import { create, erase, read, update, auth, createTable, insertData, findData, deleteData  } from "./logics.js";

export const router = express.Router();

//read endpoint
router.get("/read", auth, read);

//update endpoint
router.put("/update", auth, update);

//create endpoint
router.post("/create", auth, create);

//delete endpoint
router.delete("/delete", auth, erase);

//createTable endpoint
router.post("/createTable", createTable);

//insertData endpoint
router.post("/insertData", insertData);

//updateData endpoint
router.put("/findData/:id", findData);

//deleteData endpoint
router.put("/deletData/:id", deleteData);