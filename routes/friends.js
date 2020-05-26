const express = require('express');
const router = express.Router();
const Friend = require('../models/friends');

//creating router endpoints

//retrieve all friends
router.get('/', async (req, res) => {
    try{
        const friends = await Friend.find()
        res.status(201).json(friends)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
});

//retrieve one friend
router.get('/:id', getFriend, (req, res) => {
    res.json(res.friend)
});

//add friend
router.post('/', async (req, res) => {
    const friend = new Friend({
        name: req.body.name,
        age: req.body.age,
        discipline: req.body.discipline
    })
    try{
        const newFriend = await friend.save()
        res.status(201).json(newFriend)
    } catch(err){
        res.status(400).json({message: err.message})
    }
});

//update friends
router.patch('/:id', getFriend, async (req, res) => {
    if (req.body.name != null){
        res.friend.name = req.body.name
    }
    if (req.body.age != null){
        res.friend.age = req.body.age
    }
    if (req.body.discipline != null){
        res.friend.discipline = req.body.discipline
    }
    try{
        const updateFriend = await res.friend.save()
        res.json(updateFriend)
    } catch(err){
        res.status(400).json({message: err.message})
    }
});

//delete friend
router.delete('/:id', getFriend, async (req, res) => {
    try{
        await res.friend.remove()
        res.status(201).json({message: "Friend deleted successfully"})
    } catch(err){
        res.status(500).json({message:err.message})
    }
});

async function getFriend(req, res, next){

    try{
        friend = await Friend.findById(req.params.id)
        if(friend == null){
            return res.status(404).json({message: "Cannot find friend"})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.friend = friend
    next()
}

module.exports = router
