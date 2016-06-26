var express = require('express');
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');

app.use(express.static('public'));
app.use("/components/root/templates", express.static(__dirname + "/components/root/templates"));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/testing', function (req, res) {
    var email = process.env.SHAHLA_SITE_EMAIL;
    var pw = process.env.SHAHLA_SITE_PW;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email,
            pass: pw
        }
    });

    var mailOptions = {
        from: email,
        to: email,
        subject: 'New Appointment', // Subject line
        text: 'woohooo you just got an email bucko!'
    };

    //transporter.sendMail(mailOptions, function(error, info){
    //    if(error){
    //        console.log(error);
    //        res.json({yo: 'error'});
    //    }
    //    else{
    //        console.log('Message sent: ' + info.response);
    //        res.json({yo: info.response});
    //    };
    //});


});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});