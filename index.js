const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's alive!")
})


server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err=>{
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})



server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id

    db.findById(postId)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(404).json({error: "The post with the specified ID does not exist."})
    })
})


server.post('/api/posts', (req, res) => {

    const postInformation = {
        title: req.body.title,
        contents: req.body.contents,
    }   
    console.log('request body: ', postInformation)

    // if (!postInformation.name || !postInformation.contents) {
    //     return res.status(400).json({error: "Please provide title and contents for the post." })
    // }

    db.insert(postInformation)
    .then(post => {
        res.status(201).json(post)
    }).catch(err => {
        res.json({ error: err, message: 'error adding user'})
    });
});


server.delete('/api/posts/:id', (req, res) => {
    const postId = req.params.id; 
    db.remove(postId)
    .then(deleted => {
        res.status(204).end();
    }).catch(err => {
        res.status(404).json({error: "The post with the specified ID does not exist." })
    })
})


server.put('/api/posts/:id', (req, res) => {
    const userId = req.params.id;
    const userInformation = req.body;

    db.update(userId, userInformation) 
    .then(count => {
        res.status(200).json(count);
    }).catch(err => {
        res.json({error: "cannot update user"});
    })
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n')
})
