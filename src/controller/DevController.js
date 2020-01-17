const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res)  {
    const devs = await Dev.find();
   
    return res.json(devs);
  },
  async store(req, res)  {
    const { github_username, techs, latitude , longitude } = req.body;

    let dev= await Dev.findOne({github_username});  
    
    if(!dev){
      
    const apiResponse = await axios.get (`https://api.github.com/users/${github_username}`);
  
    const {name = login, avatar_url, bio} = apiResponse.data;
  
    const techsArray = parseStringAsArray(techs);
  
    location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
      dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location
     });
  }
  return res.json(dev);
},
 async update(req,res){
      const { id } = req.params;
      const dev = await Dev.findOne({_id: id});

      const { techs, latitude, longitude, updateGithub } = req.body;

      const arrayTechs =  parseStringAsArray(techs); 

      location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
     
      const {github_username} = dev;
      if(!updateGithub){
        const devUpdate = await dev.update({
          techs: arrayTechs,
          location
        })
      } else{ 
       
        const apiResponse = await axios.get (`https://api.github.com/users/${github_username}`);

        const {name = login, avatar_url, bio} = apiResponse.data;

              const devUpdate = await dev.update({
                name,
                avatar_url,
                bio,
                techs: arrayTechs,
                location
              })
            res.json({
              github_username,
              name,
              avatar_url,
              bio,
              techs: arrayTechs,
              location
            });
          } 
      } ,
 async delete(req,res){

 }
 }
