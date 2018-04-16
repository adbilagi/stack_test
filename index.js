const fs = require("fs");
const path = require("path")
var req = {},
  res = {},
  previous = {};
var reqOBj = [];
var use = function(fun) {
  reqOBj.push(fun)
}

use(function(req, res, previous){
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname , "/index.html"), "utf8", function(err, data){
        if(err) reject();
        else resolve(previous)
      });
    });
  });
  use(function(req, res, previous){
    previous.mid = '2nd';
    return previous;
  });
  (async () => {
    for (let index = 0; index < reqOBj.length; index++) {
      console.log (await reqOBj[index](req, res, previous));
    }
  })();
