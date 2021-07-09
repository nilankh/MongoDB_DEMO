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
const Course = mongoose.model('Course', courseSchema) //Course class(pascal naming convention for classes)
async function createCourse() {
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

// How to reterive document from mongoDB Database
async function getCourses() {
  // Comparision query operator
  //   eq(equal)
  // ne(not equal)
  // gt(greater than)
  // gte(greater than or equal to)
  // lt(less than)
  // lte(less than or equal to)
  // in
  // nin(not in)

  //   Logical Query Operator
  // or
  // and
  const courses = await Course.find()
  const courses = await Course
    // .find({author: 'Nilank Nikhil', isPublished: true})

    // Regular expression
    // Starts with Nilank
    .find({ author: /^Nilank/ })
    // Ends with Nikhil
    .find({ author: /Nikhil$/ })
    // If you want to make case insensitive
    .find({ author: /Nikhil$/i })

    // whose author contains Nilank(NIlank can be at begining at the end at the middle too)
    .find({ author: /.*Nilank.*/ })
    .limit(10)
    .sort({ name: 1 }) //ascending order if you want descending then -1.
    .select({ name: 1, tags: 1 })

  //.find({ price: 10 }) //this will return only the course which has price of 10
  // .find({ price: { $gt: 10 } })
  // .find({ price: { $gte: 10 } })
  // .find({ price: { $gte: 10, $lte: 20 } }) the courses between 10 and 20

  // now we want course which is 10,15,20
  // .find({ price: { $in: [10, 15, 20] } })

  console.log(courses)
}
getCourses()
