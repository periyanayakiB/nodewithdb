import{ pool} from './db_connect.js';
let map = { name: "", age: "" };

let credentials = {
  user: "nayaki",
  pass: "444",
};


//read function for get API 
export const read = (req, res) => {
  try {
    console.log(map);
    res.status(200).json(map);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//update function for put API 
export const update = (req, res) => {
  try {
    const { name, age } = req.body;
    map.name = name;
    map.age = age;
    console.log(map);
    res.status(200).json({ msg: "updated successfully" });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//create function for post API 
export const create = (req, res) => {
  try {
    const { name, age } = req.body;
    let newMap = { name, age };
    console.log(newMap);
    res.status(200).json(newMap);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//erase function for delete API 
export const erase = (req, res) => {
  try {
    map.name = "";
    map.age = "";
    console.log(map);
    res.status(200).json({ msg: "deleted successfully" });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//auth function for middleware 
export const auth = (req, res, next) => {
  try {
    if (
      req.body.user == credentials.user &&
      req.body.pass == credentials.pass
    ) {
      next();
    } else {
      res.status(401).json({ msg: "Access Denied" });
    }
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};


//createTable
export const createTable=async(req,res)=>{
  try{
    let newTable="CREATE TABLE DEMO_TABLE(ID INTEGER, NAME VARCHAR(25),AGE INTEGER)";
    let result = await pool.query(newTable);
    console.log("result",result);
    if(result){
      res.status(201).json({
        error:false,
        msg:"table created successfully",
        data:result,
        code:201,
      });
    }
    else{
      res.status(400).json({
        error:true,
        msg:"table not created successfully",
        data:result,
        code:201,
      });
    }
  }
  catch(e){
     res.status(500).json({ err: e.message });
  }
};

//insertData
export const insertData = async (req,res)=>{
  try{
      let insertdata = "INSERT INTO DEMO_TABLE(ID, NAME, AGE) VALUES(1, 'Anjana', 21),(2, 'nayaki', 21), (3,'Navina', 21)";
      let result = await pool.query(insertdata);
      if(result){
        res.status(201).json({
          error:false,
          msg:"data inserted successfully",
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
     res.status(500).json({err: e.message});

  }
}

//findData 
export const findData = async (req,res)=>{
  try{
      let dataID = req.params.id;
      let findDataquery = `SELECT * FROM DEMO_TABLE WHERE ID=${dataID}`;
      let result = await pool.query(findDataquery);
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
    res.status(500).json({err: e.message});
  }
}

//deleteData
export const deleteData = async (req,res)=>{
  try{
    let dataID = req.params.id;
    let deleteDataquery = `DELETE FROM DEMO_TABLE WHERE ID=${dataID}`;
    let result = await pool.query(deleteDataquery);
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
    res.status(500).json({err: e.message});
  }
}


