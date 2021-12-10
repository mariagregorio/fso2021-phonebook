const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log('To get all phonebook entries: node mongo.js <password>')
  console.log('To add new phonebook entry: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://airamgreg:${password}@cluster0.cho8j.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    let phonebook = 'phonebook:\n'
    result.forEach(person => phonebook = phonebook.concat(`${person.name} ${person.number}\n`))
    console.log(phonebook)
    mongoose.connection.close()
  })
}

if (process.argv.length > 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  }) 
  
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}