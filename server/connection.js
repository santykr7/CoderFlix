const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        if(connection.STATES.connecting)
            console.log('Database is connecting...')
        if(connection.STATES.connected)
            console.log('Database is connected')
        if(connection.STATES.disconnected)
            console.log('Database is disconnected')
        
    } catch (error) {
        console.log(error.messsage)
    }
}

module.exports = {connectDb}