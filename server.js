var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var itemsdb = mongojs('items', ['items']);
var edgesdb = mongojs('edges', ['edges']);

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

app.get('/items/:id', function(req, res){
	var id = req.params.id;
	itemsdb.items.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
})

app.put('/items/:id', function(req, res){
	var id = req.params.id;
	itemsdb.items.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {label: req.body.label, status: req.body.status, group: req.body.group, id: req.body.id}},
		new: true}, function(err,doc){
			res.json(doc);
		});
});

app.get('/edges', function(req, res){
	edgesdb.edges.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/edges', function(req, res){
	edgesdb.edges.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/edges/:id', function(req, res){
	var id = req.params.id;
	edgesdb.edges.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
});

app.listen(3000);

console.log('This server listens to port 3000!');