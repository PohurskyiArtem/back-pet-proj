import express from 'express';


const app = express()
const port = 3000

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const db = {
  courses: [
    {id: 1, title: 'Front-End'},
    {id: 2, title: 'Back-End'},
    {id: 3, title: 'DevOps'},
    {id: 4, title: 'qa'}
  ]
}

app.get('/', (req, res) => {
  // res.send(db.courses)
  res.write(`
    <div>
      <h1>Dev Courses:</h1>
      ${
        db.courses.map(c => {
          return `
            <p style="color:red; font-size:20px">
              ${c.title}
            <p/>
          `
        })
      }
    <div/>    
    `)
})

app.get('/courses', (req, res) => {
  let foundCoursesQuery = db.courses;
  if (req.query.title) {
    foundCoursesQuery = foundCoursesQuery.filter(c => c.title.indexOf(req.query.title as string) > -1)
  }
  res.json(foundCoursesQuery)
})

app.get('/courses/:id', (req, res) => {
  const foundCourse = db.courses.find(obj => obj.id === +req.params.id)

  if (!foundCourse) {
    res.sendStatus(404);
    return
  }
  res.json(foundCourse)
})

app.post('/courses', (req, res) => {
  db.courses.push({
    id: db.courses.length + 1,
    title: req.body.title
  })
  res.json(db.courses)
})

app.delete('/courses/:id', (req, res) => {
  db.courses = db.courses.filter(obj => obj.id !== +req.params.id)

  res.sendStatus(204)

})

app.put('/courses/:id', (req, res) => {
  if (!req.body.title) {
    res.sendStatus(400);
    return
  }

  const foundCourse = db.courses.find(obj => obj.id === +req.params.id);

  if(!foundCourse) {
    res.sendStatus(404);
    return
  }

  foundCourse.title = req.body.title;

  res.json(foundCourse)
  }
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})