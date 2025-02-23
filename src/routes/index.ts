var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: { render: (arg0: string, arg1: { title: string; }) => void; }, next: any) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
