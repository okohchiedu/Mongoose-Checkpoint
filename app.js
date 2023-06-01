require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { ObjectId } = require('bson')
const Person = require('./Models/Person')

mongoose.connect('mongodb+srv://okohthomas35:exdL72b0QOHchuBH@cluster0.vn2ncza.mongodb.net/')
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//create a middleware
app.use(express.json())

//creating a document instance using th Person Schemma
let chiedu = new Person({
    name: 'chiedu',
    age: 26,
    gender : 'Male',
    favouriteFoods : ["beans", 'garri', "salad"]
})

//save New Person and Catch Error if any
chiedu.save()
.then(() => console.log('New Person Saved'))
.catch((error) => console.log(error.message))

// To Create an array of Records using model.create()

let arrayOfPeople = [{
        name: 'Abiodun',
        age: 32,
        gender: 'Male',
        favouriteFoods: ['Sushi', 'Garri']
    },
    {
        name: 'Tolu',
        age: 38,
        gender: 'Female',
        favouriteFoods: ['bread', 'Pizza']
    },
    {
        name: 'Lola',
        age: 23,
        gender: 'Female',
        favouriteFoods: ['Sushi', 'Garri']
    },
    {
        name: 'Bola',
        age: 21,
        gender: 'Male',
        favouriteFoods: [ 'Garri']
    },
    {
        name: 'Kola',
        age: 23,
        gender: 'Male',
        favouriteFoods: ['Sushi']
    }]

let createPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (error, arrayCreated) => {
        if (error){
        console.log(error.message)
        } else {
        done(null, arrayCreated)
        }
    })
    createPeople()
    }

    // Using model.find() to Search through the Database

    persons()
    async function persons() {
        try{
            const findPerson = await Person
            .find({name: 'Lola'})
            console.log(findPerson)
        }catch (error){
            console.log(error.message)
        }
    }

    // Using model.findOne() to Return a Single Matching Document from the Database

    human()
    async function human () {
        try{
            const findHuman = await Person
            .findOne({favouriteFoods: ['bread', 'Pizza']})
            console.log(findHuman)
        }catch (error){
            console.log(error.message)
        }
    }

    // Using model.findById() to Search the Database By _id

    humanID()
    async function humanID () {
        try{
            const findById = await Person
            .findById('6457aa48fa686c81011f2944')
            console.log(findById)
        }catch (error){
            console.log(error.message)
        }
    }

    // To Perform Classic Updates by Running Find, Edit, then Save

    newHumanID()
    async function newHumanID () {
    try{
        const findById = await Person
        .findById('6457aa48fa686c81011f2944')
        findById.favouriteFoods.push('Hamburger')
        await findById.save()
        .then( () => {
        console.log(findById)
        })
    }catch (error){
        console.log(error.message)
    }
    }

    // Performing New Updates on a Document Using model.findOneAndUpdate()

    updateHumanId()
    async function updateHumanId() {
        try{
            const findAndUpdate = await Person
            .findOneAndUpdate({name: 'Ahmed'}, {age: 45}, { new: true })
            .then( (data) => {
            console.log(data)
            })
        }catch (error){
            console.log(error.message)
        }
    }

    // To delete a single Document using model.findByIdAndRemove

    removeHumanId()
    async function removeHumanId() {
    try{
        const findByIdAndRemove = await Person
        .findByIdAndRemove("6456e4e7165f8be2d260e257")
    }catch (error){
        console.log(error.message)
    }
    }

    // using MongoDB and Mongoose to Delete Many Documents with model.remove()

    removeMany()
    async function removeMany(){
    try{
        const deleteMany = await Person
        .deleteMany({name : 'goodnews'}) // using .deleteMany because Node says .remove is not a fucntion, it is deprecated.
    }catch(error){
        console.log(error.message)
    }
    }

    // Using Chain Search Query Helpers to Narrow Search Results

    chainQuery()
    async function chainQuery(){
     try{
        const findAll = await Person
        .find({favouriteFoods :'beans'})
        .sort('age')
        .limit(2)
        .select('age')
        .exec()
        console.log(findAll)
    }  catch (error){
        console.log(error)
    }
    }



//creating a server 
app.listen(3001, () => console.log('Server is listening at port 3001'))