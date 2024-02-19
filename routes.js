import express from "express";
import { createAddress, readAddress, updateAddress, deleteAddress, mid, createTable, findId, insertTable, deleteId, insertData, readData } from "./controller.js";

export const router = express.Router();

//create 
router.post("/create", mid, createAddress);

//read
router.get("/read", mid, readAddress);

//update
router.put("/update", mid, updateAddress);

//delete 
router.delete("/erase", mid, deleteAddress);

//create table
router.post('/createTable',createTable);

//find Id
router.get('/findid/:id', findId);

//insert table
router.put('/insertTable',insertTable);

//delete Id
router.delete('/delete/:id',deleteId);

//insert from request
router.post('/insertData',insertData);

//read 
router.get('/readData',readData);