import { pool } from "./dbconnect.js";
import { validator } from "./validator.js";

let address = {name: "", city: "" };
let key={user:"nayaki", password:"444"};

// Post function
export const createAddress = (req, res) => {
    try {
        const {name,city} = req.body;
        let newAddress={name,city};
        res.status(200).json(newAddress);
    } 
    catch (e) {
        res.status(501).json({ err: e.message });
    }
};

// Get function
export const readAddress = (req, res) => {
    try {
        res.status(200).json(address);
    } 
    catch (e) {
        res.status(500).json({ err: e.message });
    }
};

// Put function
export const updateAddress = (req, res) => {
    try {
        address.name = "Siva";
        address.city = "Dpm";
        res.status(200).json({ msg: `${address.name} and ${address.city} is updated`});
    } 
    catch (e) {
        res.status(500).json({ err: e.message });
    }
};

// Delete function
export const deleteAddress = (req, res) => {
    try {
        address.name = "";
        address.city = "";
        res.status(200).json({ msg: `The address data is deleted` });
    } 
    catch (e) {
        res.status(500).json({ err: e.message });
    }
};

// Middleware function
export const mid = (req, res, next) => {
    try {
        if (req.body.user==key.user && req.body.password==key.password){
            next();
        } 
        else {
            res.status(402).json({ msg: `Unauthorized` });
        }
    } 
    catch (e) {
        res.status(500).json({ err: e.message });
    }
};

//create table
export const createTable=async (req,res)=>{
    try{
        const newTable = "CREATE TABLE DEMO_TABLE(ID INTEGER, NAME VARCHAR(50), AGE INTEGER)";
        const result = await pool.query(newTable);
        if(result){
            res.status(200).json({
                error:false,
                msg:"table created successfully",
                data:result,
                code:200,
            });
        }
        else{
            res.status(500).json({
                error:true,
                msg:"table not created successfully",
                data:result,
                code:200,
            })
        }   
    }
    catch(e){
        res.status(500).json({ err: e.message });
    }
};

//insert table
export const insertTable = async (req,res)=>{
    try{
        const newData = "INSERT INTO DEMO_TABLE(ID, NAME, AGE) VALUES(1, 'Anjana', 21),(2, 'nayaki', 21), (3,'Navina', 21)";
        const result = await pool.query(newData);
        if(result){
            res.status(200).json({
                error:false,
                msg:"table updated successfully",
                data:result,
                code:200, 
            });
        }
        else{
            res.status(400).json({
                error:true,
                msg:"table not updated successfully",
                data:result,
                code:400,
            });
        }
    }
    catch(e){
        res.status(500).json({ err: e.message });
    }
};

//get Id
export const findId = async (req,res)=>{
    try{
        const getId = req.params.id;
        const findId= `SELECT * FROM DEMO_TABLE WHERE ID=${getId}`;
        const result = await pool.query(findId);
        if(result){
            res.status(200).json({
                error:false,
                msg:"data found successfully",
                data:result.rows,
                code:200,
            });
        }
    }
    catch(e){
        res.status(500).json({ err: e.message });
    }
};

//delete Id
export const deleteId = async (req,res)=>{
    try{
        const eraseId= req.params.id;
        const deleteId = `DELETE FROM DEMO_TABLE WHERE ID=${eraseId} ;`;
        const result = await pool.query(deleteId);
        if(result){
            res.status(200).json({
                error:false,
                msg:"data deleted successfully",
                data:result.rows,
                code:200,
            });
        }
    }
    catch(e){
        res.status(500).json({ err: e.message });
    }
};

//insert dynamic user data
export const insertData = async (req, res)=>{
    try{
        const {data, success, code, message}=validateData(req.body);
        if (!success){
            return res.status(code).json({error:true,Msg:e.message, code});
        }
    }
    catch (e){
        res.status(500).json({error:true,Msg:e.message,code:500})
    } 
};

// read dynamic data
export const readData = async (req , res)=>{
    try{
        const id = [req.params.id];
        const read = "SELECT * FROM DEMO_TABLE WHERE ID=$1";
        const result = await pool.query(read, id);
        if(result){
            res.status(200).json({
                error:false,
                msg:"data read successfully",
                data:result.rows,
                code:200,
            });
        }
    }
    catch(e){
        res.status(500).json({ err: e.message });
    }
};
    



