/*
GET ALL THE PUBLISHED COURSES THAT ARE $15 OR MORE,
HAVE THE WORD 'BY' IN THEIR TITLE
*/

const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
  const courses = await Course
    
    .find({ isPublished: true })
    .or([
        { price:{ $gte: 15} },
        {name: /.*by.*/i }
    ])

    .sort({ price: -1 }) //different way .sort('price') for ascending for descending .sort(-price)
    .select({ name: 1, author: 1, price: 1 }) //different way .sort('name author')
  return courses
}

async function run() {
  const courses = await getCourses()
  console.log(courses)
}

run()
