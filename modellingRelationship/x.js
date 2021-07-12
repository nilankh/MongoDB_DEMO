// Trade off between query performance vs consistency

// Using references(Normalization)->CONSISTENCY
let author = {
  name: 'Nilank Nikhil',
}

let course = {
  author: 'id',
}

// Using Embedded Documents(Denormalization)-> PERFORMANCE
let course = {
  author: {
    name: 'Nilank Nikhil',
  },
}

// Hybrid
let author = {
  name: 'Nilank Nikhil',
  // 50 other properties
}

let course = {
  author: {
    id: 'ref',
    name: 'Nilank Nikhil',
  },
}
