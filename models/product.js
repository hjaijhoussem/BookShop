const { builtinModules } = require('module');
const path = require('path');
const fs = require('fs');

const p =  path.join(path.dirname(process.mainModule.filename),'data','products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(title){
        this.title = title;
    }

    save(){
        
        getProductsFromFile(products =>){
            //adding the new product to products array
            products.push(this);
            // replace the content of the file with the data in products array that already contains the old + new added data
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        };
    };
    //JSON.stringify(arg) : turn the data to string
    static fetchAll(cb){ // cb a function 
        getProductsFromFile(cb);
    }
}