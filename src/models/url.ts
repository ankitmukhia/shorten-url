import mongoose from 'mongoose'
const { Schema } =  mongoose

interface IUrl {
	userId: string
	origUrl: string
	shortUrl: string
	visited: number
}

const url = new Schema<IUrl>({
	userId: {
		type: String,
		require: true
	},
	origUrl: {
		type: String,
		require: true 
	},
	shortUrl: {
		type: String,
		require: true 
	},
	visited: {
		type: Number,
		require: true
	}
})

const Url = mongoose.model<IUrl>('Url', url)

export { Url }
