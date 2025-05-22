import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello From Node Demo 2')
})

app.listen(3000, () => {
  console.log('Server is running on 3000')
})
