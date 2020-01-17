const Dev = require ('../models/dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
  async index(req,res){
    //buscar todos os devs num raio de 10km
    //filtrar por tecnologias
    const { latutude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
              type: 'Point',
              coordinates: [longitude, latutude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json({ devs});
  }
}