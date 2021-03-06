const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

//   This is Schema(Shape of document)
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: boolean,
})

//   Now we have schema we need to compile into model, which gives us class here class is 'Course', next we can create object based on that class, and this object maps with document in MongoDB database.
const Course = mongoose.model('Course', courseSchema) //Course class(pascal naming convention for classes)
// Now we are creating object based on above class.
const course = new Course({
  name: 'Node.js Course',
  author: 'Nilank Nikhil',
  tags: ['node', 'backend'],
  isPublished: true,
})

// Classes, objects
// Human, Nilank(Nilank is an instance of Human)Like here Classe is Course and instance is Node.js course & save this in db.
