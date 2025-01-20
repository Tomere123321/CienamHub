const permissionService = require('../Services/permissionsService');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const permission = await permissionService.getAllPermissions();
        return res.status(200).json(permission);
    } catch (e) {
        console.log('Error in permission Service:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const permissionId = await permissionService.getPermissionById(id);
        return res.status(200).json(permissionId);
    } catch (e) {
        console.log('Error in get permission Id:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => { 
    try {
        const newData = req.body;
        const permission = await permissionService.CreatePermission(newData); 
        return res.status(201).json({ permission });
    } catch (e) {
        console.log('Error in Add Permission:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatePermission = await permissionService.updatePermission(id, newData);
        return res.status(200).json({ updatePermission });
    } catch (e) {
        console.log('Error in update Permission:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePermission = await permissionService.deletePermission(id);
        return res.status(200).json({ deletePermission });
    } catch (e) {
        console.log('Error in delete Permission:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
