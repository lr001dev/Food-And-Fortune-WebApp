const express = require(`express`)
const app = express()
const port = 3001

app.use(express.static(`public`))

app.get(`/`, (req,res) => {

})
app.listen(port, () => {
  console.log(`I'm listening to port ${ port }`)
})
