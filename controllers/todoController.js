var bodyParser = require('body-parser');
var mongoose  = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test123@ds159631.mlab.com:59631/todoexampledb');


//create a schema -which is a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongoDb database and pass it to view

  Todo.find({}, function(err, data){
    if(err) throw err;
    res.render('todo', {todos: data});
  });
});

app.post('/todo', urlencodedParser, function(req, res){

  //get data from the view and add it to mongoDb
  var newTodo = Todo(req.body).save(function(err, data){
    if(err) throw err;
    res.json(data);
  })

});
app.delete('/todo/:item', function(req, res){

  //delete the requested item from mongodb

  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });

});


}
