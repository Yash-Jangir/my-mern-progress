import mongoose from "mongoose"

const {
    DB_PROTOCOL,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env

const dbUrl = () => {
    let url = `${DB_PROTOCOL}://`
    if (DB_USERNAME && DB_PASSWORD) {
        url += `${DB_USERNAME}:${DB_PASSWORD}@`
    }
    url += `${DB_HOST}`
    if (DB_PORT) {
        url += `:${DB_PORT}`
    }
    if (DB_DATABASE) {
        url += `/${DB_DATABASE}`
    }

    return url
}

const dbConfig = {
    url: dbUrl(),
    port: DB_PORT,
    host: DB_HOST,
    database: DB_DATABASE,
}

export const initDBConnection = async () => {
    await mongoose.connect(dbConfig.url)
    console.log(`Database connected to ${dbConfig.url}`)
    return true
}

export default dbConfig
