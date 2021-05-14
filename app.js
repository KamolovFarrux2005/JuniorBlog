const express = require('express');
const app = express();
const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://farrukh:Kamalovfarrux1@cluster0.tk38z.mongodb.net/JuniorBlog?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(()=>{
         console.log('connect');
    }).catch(err =>{
        console.log(err)
});

const blogSchema = new mongoose.Schema({
    img: {
        type: String
    },
    title: {
        type: String
    },
    snippet: {
        type: String
    },
    body: {
        type: String
    }
});

const Blog = mongoose.model('Blog', blogSchema);


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    Blog.find().then(result =>{
            res.render('index', {title: 'Blogs', result})
        }).catch(err =>{
            console.log('err: ', err);
    });
});

app.get('/newBlog', (req, res) => {
    res.render('newBlog', {title: 'New blog'});
});

app.post('/', (req, res)=>{
    const savedblog = new Blog(req.body);
    savedblog.save()
        .then(() => {
            res.redirect('/');
        }).catch(err =>{
            console.log('err: ', err);
        })
});

app.get('/blog/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
            res.render('blog', {title: result.title, result})
        })
        .catch(err =>{
            console.log(err)
    });
});

app.get('/delete/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.redirect('/')
        })
        .catch(err => {
            console.error(err)
        })
});

const Port = process.env.Port || 3000;
app.listen(Port, ()=>{
    console.log('http://0.0.0.0:3000');
});