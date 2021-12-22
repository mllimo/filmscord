
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

module.exports = {
  findByIdAndUpdate,
};