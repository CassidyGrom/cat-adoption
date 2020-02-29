const connection = require("../config/connection");

//defining the fuctionality, don't worry about the routes rn
connection getCats = () => {
  return new Promise((resolve, reject) => {
    //custom code
    connection.query("SELECT * FROM cats", (err, catdata)=> {
      if (err){
        console.log(err);
        //this will fo to promises .catch()
        return reject(err);
      }

      // this will go to the promies .then()
      resolve(catdata);
    });
  });
};

// create a cat
// acceptes object paramater => {cat_name: "Mr. Must"}
const createCat = (catObj) => {
  return new Promise ((resolve, reject)=> {
    connection.query("INSERT INTO cates SET ?", catObj, (err,catdata) => {
      if (err){
        console.log(err);
        //this will fo to promises .catch()
        return reject(err);
      }
      resolve(catdata);
    });
  });
};
//update cats status
//catObj => {adopted:true} OR {adopted:false}
const updateCat = (catObj, catId) =>{
  return new Promise ((resolve, reject)=> {
    connection.query("UPDATE cats SET ? WHERE id = ?",[catObj, catId], (err,catdata) => {
      if (err){
      console.log(err);
      return reject(err);
    } else if(catdata.affectedRows === 0){
      return resolve ({message: "couldnt find a cat with that id"});
    }
    resolve({message:"cat updated success"});
  });
  })
};

// delete a cat
const deleteCat = (catId) => {
  return new Promise ((resolve, reject)=>{
    connection.query("DELETE FROM cates WHERE id = ?", [catId],(err, catdata) => {
      if (err){
      console.log(err);
      return reject(err);
    } else if(catdata.affectedRows === 0){
      return resolve ({message: "couldnt find a cat with that id"});
    }
    resolve({message:"cat deleted success"});
    });
  });
};

//export them
module.exports = { getCats, createCat, updateCat, deleteCat};