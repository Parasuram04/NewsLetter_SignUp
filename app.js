const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.First;
    const lastName = req.body.Last;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/49e60d2bcc";

    const options = {
        method:"POST",
        auth:"parasuram:665ef1f99d7951e9bd487ef790fcfdb0-us17"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+ "/success.html");
        }
        else{
            res.sendFile(__dirname+ "/failure.html");
        }
        response.on("data",function(data){
            
        });
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT,function(){
    console.log("Server with port 3000 has started...");
});


// Api Key
// 665ef1f99d7951e9bd487ef790fcfdb0-us17

// list id
// 49e60d2bcc