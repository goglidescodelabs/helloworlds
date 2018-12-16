const express = require('express');  
const bodyParser = require('body-parser');
let Book = require('./book_model');
const app = express();
const mongoose = require('mongoose');

let db_url = 'mongodb://localhost:27017/LibraryApp';
mongoose.connect(db_url, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
let db = mongoose.connection;


app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8081;  
  

app.post('/add', (req, res)=> {
    let book = new Book(  
        {  
            name: req.body.name,  
            author: req.body.author,
            isbn : req.body.isbn  
        }  
    );
    
    book.save( (err)=> {
        if (err) { res.send({'msg' : 'Failed'}) }
        res.send({'msg': 'Success'})
    })


})
app.post('/update', (req, res )=> {

    Book.findById(req.body.id , (err, book)=> {
        if (err) res.send({'msg' : 'Failed'})

        console.log(book)

        book.name = req.body.name;
        book.author = req.body.author;
        book.isbn = req.body.isbn;

        book.save( (err, updatedBook)=> {
            if (err) res.send({'msg' : 'Failed'})
            res.send(updatedBook);
        });
      });

})

app.get('/list', (req, res )=> {
	Book.find({}, (err, books)=> {
		if(err) res.send({'msg': 'Failed'})
		res.send(books);
	});
});

app.post('/remove', (req, res)=>{
    Book.findOneAndDelete({_id : req.body.id}, ()=>{
        res.send({'msg': 'Deleted'})
    })
})


app.listen(PORT, () => {  
    console.log(`Sever is Up and Running at ${PORT}`);  
});

db.on('error', () => console.log('MongoDB connection error'));

