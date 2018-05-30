const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PORT = 8080;
const app = express();

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join('public')));

app.get('/', (req,res) => {
    res.render('index', {pageName: 'welcome'});
});
app.get('/about', (req,res) => {
    res.render('about', {pageName: 'about'});
});
app.get('/contact', (req,res) => {
    res.render('contact', {pageName: 'contact'});
});

app.post('/contact/send', (req,res) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'support@gmail.com',
            pass: 'support pass'
        }
    });
    let mailOptions = {    // https://myaccount.google.com/lesssecureapps ==> allow less secure ON
        from: 'Auto Replay <khalidkhadra@gmail.com>',
        to: req.body.email,
        subject: 'Website Submission',
        text: 'Thank you for submission we will contact you as soon as possible',
        html: '<p>Thank you  for submission we will contact you asap</p><br><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };
    transporter.sendMail(mailOptions, (error,info) => {
        if (error){
            console.log(error);
            res.redirect('/contact');
            res.end();
        }else {
            console.log('Message was sent...'+ info.response);
            res.redirect('/contact');
        }
    });
    res.redirect('/contact');
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}...`);
});
