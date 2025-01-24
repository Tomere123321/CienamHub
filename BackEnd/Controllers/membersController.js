const memberService = require('../Services/memberService');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const members = await memberService.getMembers();
        return res.status(200).json(members);

    } catch (e) {
        console.log('Error in members Service:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const memberId = await memberService.getMemberById(id);
        return res.status(200).json(memberId);
    
    } catch (e) {
        console.log('Error in get Member Id:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => { 
    try {
        const newData = req.body;
        const newMember = await memberService.addMember(newData); 
         return res.status(201).json({ message: newMember });
    
        } catch (e) {
        console.log('Error in Add Member:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const newData = req.body;
        const updateMember = await memberService.updateMember(id, newData);
        return res.status(200).json({ message: updateMember });
    
    } catch (e) {
        console.log('Error in update Member:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMember = await memberService.deleteMember(id);
        return res.status(200).json({ message: deleteMember });
   
    } catch (e) {
        console.log('Error in deleteMember:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
