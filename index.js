// npm init -y

// bcrypt takes time, all bcrypt functions return a promise so they require async/await

/*
    1. Import bcrypt
*/
const bcrypt = require("bcrypt")

/*
    2. Write a generateSalt function
*/
// const generateSalt = async () => {
    
//     // produces a string of random characters then keeps utilizing that string to create an even more random set of characters, goes through 10 rounds of this by default

       // as you increase the number of rounds, it takes more time to do

//     // takes time so async/await
//     const salt = await bcrypt.genSalt(10)

//     console.log(salt)
// }

// generateSalt()

/*
    3. Write a hashAndSalt function
*/
// create a hashed password utilizing bcrypts functions
const hashAndSalt = async (password) => {

    const salt = await bcrypt.genSalt(10)

    // takes in data you are trying to hash and the salt
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log(`Salt: ${salt}`)
    console.log(`Hashed Password: ${hashedPassword}`)

    return hashedPassword

}

// hashAndSalt("password123")

/*
    4. Write a comparePassword function
*/
const originalPassword = "coolpassword1098"


const comparePassword = async (incomingPassword) => {

    // sign up process - generate the salt and use it to create a hash based on the originalPassword
    const hashedPassword = await hashAndSalt(originalPassword)

    // login process
    // compares our incoming password against the hashed password
    // re-hashes the incoming password utilizing the salt
    const isSamePassword = await bcrypt.compare(incomingPassword, hashedPassword)

    if (isSamePassword) {
        console.log("Logged in successfully!")
    } else {
        console.log("Login Failed!")
    }
}

// comparePassword("coolpassword1098")

const measureSaltCostFactor = async () => {

    const password = "examplePassword1"

    for (let costFactor = 10; costFactor <= 30; costFactor++) {

        // starts a timer you can use to track how long an operation takes
        console.time(`Cost Factor ${costFactor}`)

        const salt = await bcrypt.genSalt(costFactor)

        await bcrypt.hash(password, salt)

        console.timeEnd(`Cost Factor ${costFactor}`)
    }
}

measureSaltCostFactor()


//1155