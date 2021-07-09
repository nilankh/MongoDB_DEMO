/*
GET ALL THE PUBLISHED BACKEND COURSES,
SORT THEM BY THEIR NAME,
PICK ONLY THEIR NAME AND AUTHOR,
AND DISPLAY THEM.
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
  const courses = await Course.find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 }) //different way .sort('name') for ascending for descending .sort(-name)
    .select({ name: 1, author: 1 }) //different way .sort('name author')
  return courses
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();