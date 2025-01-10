const userService = require('../Services/userServices');
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');

// router.use(protectRoute);

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);

    } catch (e) {
        console.log('Error in getUsers:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    
    } catch (e) {
        console.log('Error in getUserById:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => { 
    try {
        const newData = req.body;
        const newUser = await userService.CreateUser(newData);
        return res.status(201).json({ newUser }); 
    
    } catch (e) {
        console.log('Error in addUser:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/update/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedUser = await userService.updateUser(id, newData);
        return res.status(200).json({ message: updatedUser });
    
    } catch (e) {
        console.log('Error in updateUser:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(id);
        return res.status(200).json({ message: deletedUser });
   
    } catch (e) {
        console.log('Error in deleteUser:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
