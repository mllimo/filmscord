
async function findByIdAndUpdate(schema, id, modifier, options = { new: true }) {
  return new Promise( (resolve, reject) => {
    schema.findByIdAndUpdate(id, modifier, options, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

async function findOneAndUpdate(schema, query, modifier, options = { new: true }) {
  return new Promise( (resolve, reject) => {
    schema.findOneAndUpdate(query, modifier, options, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports = {
  findByIdAndUpdate,
  findOneAndUpdate
};