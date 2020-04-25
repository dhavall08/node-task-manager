const express = require('express');
require('./db/mongoose');
const tasksRoutes = require('./routers/tasksRoutes');
const userRoutes = require('./routers/userRoutes');

const app = express();

app.use(express.json());
/*  
    same as app.use(bodyParser.json()); where bodyParser is different npm module
    header content-type should be application/json
*/

/*  
   app.use((req, res, next) => {
   res.status(503).send('Site is currently down. Check back later!');
   })
*/

app.use(userRoutes);
app.use(tasksRoutes);

module.exports = app;