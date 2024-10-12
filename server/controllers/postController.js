const {success} = require('../utils/responseWrapper');

const getAllPostController = async (req,res) => {
    console.log(res._id);
    return res.send(success(200,'These are all the posts'));
} 

module.exports = getAllPostController;