//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var cors = require ("cors");
var corsOptions = {origin:"*",optionSuccessStatus:200};

var app     = express();
app.use(cors(corsOptions));

var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

// Función para obtener los datos de la BD. Estos son expuestos en la consola de cliente.
app.get("/otraCosa/:id",(req,res,next) => {
    console.log("id",req.params.id)
    utils.query("select * from Devices where id="+req.params.id,(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
       }

        //console.log(fields);
    });

});    

//POST para cambiar el estado de un dispositivo a partir de su ID. 
app.post("/device",(req,res,next) => {
    //console.log("Llego el post",
    utils.query("UPDATE Devices SET state = "+req.body.state+"`,description=`"+req.body.description+"`,type="+req.body.type+" WHERE id="+req.body.id);
        if(req.body.name==""){
             res.status(409).send("no tengo nada que hacer");
        }else{
            res.status(200).send("se guardo el dispositivo");
        }  
});

// GET para cargar en localhost:8000/devices todos los dispositivos de la base de datos. 
app.get('/devices/', function(req, res, next) {
    
    utils.query("select * from Devices",(err,rsp,fields)=>{
        if(err==null){
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
});
       

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
