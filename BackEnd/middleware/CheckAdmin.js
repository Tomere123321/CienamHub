const userModel = require('../Models/userModel');

const verifyAdmin = async (req, res, next) => {

    const { userName } = req.body;
    
    try {
        const isAdmin = await userModel.findOne({ userName });

        if (isAdmin === 'Admin') { 
            next();
        
        } else {
            res.status(403).json('No Permission. You Are Not An Admin');
        }
   
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

module.exports = verifyAdmin;
