const express = require(`express`)
const app = express()
const port = 3001

app.use(express.static(`public`))
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

app.get(`/`, (req,res) => {

})
app.listen(port, () => {
  console.log(`I'm listening to port ${ port }`)
})
