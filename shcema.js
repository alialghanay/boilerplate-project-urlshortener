const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


let urlSchema = new mongoose.Schema({
   "_id": Number,
    "original": {type: String, required: true}
  }, { _id: false });
urlSchema.plugin(AutoIncrement);

let Url = mongoose.model('Url', urlSchema);
let Counters = mongoose.model('Counters', urlSchema);
  function createAndSaveUrl(url) {
    var newUrl = new Url({
      "original": url
    });
      newUrl.save((error, data) => {
        if(error){
          console.log(error);
        }else {
          return data;
        }
      })
  }

function findURL(url, done) {
    Url.findOne({"original":url})
     .select('-__v')
     .exec((error, data) => {
    if(error){
      conosle.log("not");
    }else {
       done(null, data);
    }
  })
};

function findurlbyId(id, done) {
  Url.findById({'_id': id})
     .exec((error, data) => {
      if(error){
        console.log(error);
      }else {
        done(null, data);
      }
     })
}

function findurlTheId(done) {
  Counters.findOne()
     .select('seq')
     .exec((error, data) => {
      if(error){
        console.log(error);
      }else {
        let result = data["_doc"]["seq"] + 1;
        done(null, result);
      }
     })
}

exports.Url = Url;
exports.createAndSaveUrl = createAndSaveUrl;
exports.findURL = findURL;
exports.findurlbyId = findurlbyId;
exports.findurlTheId = findurlTheId;
// var findURLAndUpdate = (url, done) => {
//     Url.findOneAndUpdate({original_url:url},{short_url: }, {new: true})
//      .select('-_id -__v')
//      .exec((error, data) => {
//     if(error){
//       conosle.log(error);
//     }else {
//        done(null, data);
//     }
//   })
// };
  