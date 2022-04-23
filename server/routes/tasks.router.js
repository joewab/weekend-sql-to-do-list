const express = require('express');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////

const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
  database: 'weekend-to-do-app',
  host: 'localhost'
});

pool.on('connect', () => {
  console.log('Yay! We are talking to our postgresql database!');
})

pool.on('error', (error) => {
  console.log('Something with postgresql really broke. It broke hard.', error);
})

///////////////////////////////////////////////////////////////////////////////
//write routes here:

router.get('/', (req, res) => {
  console.log('GET /tasks');
  let queryText = `
    SELECT * FROM "tasks"
      ORDER BY "id" DESC;
  `;
  pool.query(queryText)
    .then((dbResult) => {
      console.log('here are the rows that our SQL query asked for:');
      console.log(dbResult.rows);
      res.send(dbResult.rows);
    })
    .catch((dbError) => {
      console.log('error in GET /tasks db request:', dbError);
      res.sendStatus(500);
    })
});

///////////////////////////////////////////////////////////////////////////////

router.post('/', (req, res) => {
  console.log('POST task');
  console.log(req.body);
  let sqlQuery = `
    INSERT INTO "tasks"
    ("task", "person_responsible", "description", "helpful_notes", "complete") 
    VALUES
    ($1, $2, $3, $4, $5);
  `

  let sqlValues = [
    req.body.task,
    req.body.person_responsible,
    req.body.description,
    req.body.helpful_notes,
    req.body.complete
  ];

  pool.query(sqlQuery, sqlValues)
  .then((dbResult) => {
    res.sendStatus(201);
  })

  .catch((dbError) => {
    console.log('error in post route');
    console.log(dbError);
  })
})

///////////////////////////////////////////////////////////////////////////////

router.delete('/:taskId', (req, res) => {
  let taskToDelete = req.params.taskId;
  let sqlQuery = `
    DELETE FROM "tasks"
      WHERE "id"=$1;
  `
  let sqlValues = [taskToDelete];
  pool.query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log('error in DELETE /songs db request:');
      res.sendStatus(500);
    })
})

///////////////////////////////////////////////////////////////////////////////

router.put('/:taskId', (req, res) => {
  let sqlQuery = `
    UPDATE "tasks"
      SET "complete"=$1
      WHERE "id"=$2;
  `;
  let sqlValues = [
    req.body.newcurrentCompleteStatus,
    req.params.taskId
  ]
  pool.query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log('error in PUT /tasks db request:');
      res.sendStatus(500);
    })
})


module.exports = router;