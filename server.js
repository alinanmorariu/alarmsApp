var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var itemsdb = mongojs('items', ['items']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/items', function(req, res){
	itemsdb.items.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/items', function(req, res){
	itemsdb.items.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/items/:id', function(req, res){
	var id = req.params.id;
	itemsdb.items.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
})

app.listen(3000);

console.log('This server listens to port 3000!');