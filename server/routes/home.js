const express = require('express');
const router = express.Router();

router.route('/')
	.get((req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
})


module.exports = router;