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
  isPublished: Boolean,
})

//   Now we have schema we need to compile into model, which gives us class here class is 'Course', next we can create object based on that class, and this object maps with document in MongoDB database.
async function createCourse() {
  const Course = mongoose.model('Course', courseSchema) //Course class(pascal naming convention for classes)
  // Now we are creating object based on above class.
  const course = new Course({
    name: 'Angular Course',
    author: 'Nilank Nikhil',
    tags: ['Aungular', 'frontend'],
    isPublished: true,
  })

  // Classes, objects
  // Human, Nilank(Nilank is an instance of Human)Like here Classe is Course and instance is Node.js course & save this in db.
//   course.save() it will take some time to save in db, result will be ready in future.
  const result = await course.save()
  console.log(result)
}
createCourse();