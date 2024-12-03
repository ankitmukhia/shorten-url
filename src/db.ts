import mongoose from 'mongoose'

export const db = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URL}`)
		console.log(`connected successfully!`)
	}catch(err) {
		console.error(err)
		throw err
	}
}
