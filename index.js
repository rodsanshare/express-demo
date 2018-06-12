const Joi = require('joi');
const express = require('express');
const app = express();

const courseController = require('./server/api/courses/courseController');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    const courses = courseController.get();

    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    const course = {
        id: 0,
        name: req.body.name
    };

    const newCourse = courseController.post(course);

    res.send(newCourse);

});

app.put('/api/courses/:id', (req, res) => {

    const course = {
        id: req.params.id,
        name: req.body.name
    };
    
    const { error } = validateCourse(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    
    const updatedCourse = courseController.put(course);

    res.send(updatedCourse);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courseController.delete(req.params.id);

    if (!course) res.status(404).send('Course not found');

    res.send(course);
});


app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id);
    const course = courseController.getOne(req.params.id);

    if (!course) res.status(404).send('Course not found');

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));