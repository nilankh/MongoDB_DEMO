const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

//   This is Schema(Shape of document)
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    // While creating the course, the category we set, it should be one of these values
    lowercase: true,
    uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    //   Custom validator
    type: Array,
    validate: {
      // Async Validators
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          //   Do some async work
          const result = v && v.length > 0
          callback(result)
        }, 4000)
      },
      message: 'A course should have atleast one tag.',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    // in this case we can't replace this with arrow function, bcz arrow function don't have their own this
    required: function () {
      return this.isPublished
    },
    min: 10,
    max: 200,
    
    // Custom setter and getter
    get: v => Math.round(v),
    set: v =>Math.round(v)
  },
})

//   Now we have schema we need to compile into model, which gives us class here class is 'Course', next we can create object based on that class, and this object maps with document in MongoDB database.
const Course = mongoose.model('Course', courseSchema) //Course class(pascal naming convention for classes)
async function createCourse() {
  // Now we are creating object based on above class.
  const course = new Course({
    name: 'Angular Course',
    category: 'Web',
    author: 'Nilank Nikhil',
    tags: ['frontend'],
    isPublished: true,
    price: 15.9,
  })

  // Classes, objects
  // Human, Nilank(Nilank is an instance of Human)Like here Classe is Course and instance is Node.js course & save this in db.
  //   course.save() it will take some time to save in db, result will be ready in future.
  try {
    const result = await course.save()
    console.log(result)
    //dono tarike se kar skte ho
    // await course.validate()
  } catch (ex) {
    // ex.errors
    for (field in ex.errors) console.log(ex.errors[field].message)
  }
}

async function getCourses() {}
async function updateCourses() {}

createCourse()
