const subscriptionsService = require('../Services//subscriptionService');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const subs = await subscriptionsService.subscription();
        return res.status(200).json(subs);

    } catch (e) {
        console.log('Error in subscriptionsService:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const subsId = await subscriptionsService.getSubscriptionById(id);
        return res.status(200).json(subsId);
    
    } catch (e) {
        console.log('Error in get subsId:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => { 
    try {
        const newData = req.body;
        const newsubs = await subscriptionsService.addSubscription(newData); 
         return res.status(201).json({ message: newsubs });
    
        } catch (e) {
        console.log('Error in Add subs:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatesubs = await subscriptionsService.updateSubscription(id, newData);
        return res.status(200).json({ message: updatesubs });
    
    } catch (e) {
        console.log('Error in update subs:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletesubs = await subscriptionsService.deleteSubscription(id);
        return res.status(200).json({ message: deletesubs });
   
    } catch (e) {
        console.log('Error in deletesubs:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
