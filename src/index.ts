import express, { Request, Response } from 'express'
import { db } from './db'
import { Url } from './models/url'
import uniqid from 'uniqid'
const app = express()

app.use(express.json())
import "dotenv/config"

const PORT = process.env.PORT ?? 5000 

app.post("/short", async (req: Request, res: Response) => {
	const { origUrl } = req.body;

	const uuId = uniqid()
	try {
		// have db call here, so save 
		const url = await Url.findOneAndUpdate({
			origUrl
		}, {
			$inc: { visited: 1 }
		})

		if(url) {
			res.status(200).json({
				visited: url.visited,
				url:  url.shortUrl
			})
			return
		}	

		const createUrl = await Url.create({
			userId: uuId,
			origUrl,
			shortUrl: `${process.env.BASE_URL}/${uuId}`,
			$inc: { visited: 1 }
		})

		res.status(200).json({
			visited: createUrl.visited,
			url: createUrl.shortUrl
		})
	}catch (err) {
		console.error(err)
		res.status(500).json("Our apologies. Something went wrong...")
	}
})

app.get('/:urlId', async (req: Request, res: Response) => {
	const { urlId } = req.params;

	try {
		const url = await Url.findOneAndUpdate({
			shortUrl: `${process.env.BASE_URL}/${urlId}`
		}, {
			$inc: { visited: 1 }
		})

		if(!url) {
			res.status(400).json({
				message: "Invalid url" 
			})
			return
		}

		res.redirect(url.origUrl)
	}catch(err) {
		console.error(err)
		res.status(500).json("Our apologies. Something went wrong...")
	}

})


db().then(() => {
	app.listen(PORT, () => {
		console.log(`PORT is running at http://localhost:${PORT}`)
	})
}).catch(err  => {
	console.log(`Error while connection: `, err)
})

