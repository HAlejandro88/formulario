const   express = require('express'),
        bodyParser = require('body-parser'),
        request = require('request'),
        nodemailer = require('nodemailer'),
        app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/suscribe', (req, res)=>{
    const contacto = req.body;
    const output = `
            <p> Tienes un nuevo Ponente  </p>
            <h3> Detalles del solicitante:  ${contacto.nombre}</h3>
            <ul>
                <li>Nombre: ${contacto.nombre}</li>
                <li>Apellido: ${contacto.apellidoPaterno} ${contacto.apellidoMaterno}</li>
                <li>Email: ${contacto.email}</li>
                <li>Telefono de contacto: ${contacto.movil}</li>
                <li>Universidad: ${contacto.uni}</li>
                <li>Dependencia: ${contacto.dependencia}</li>
                <li>Titulo Ponencia: ${contacto.tituloPonencia}</li> 
                <li>Arco Tematico: ${contacto.arcTema}</li>
                <li>Grado Academico: ${contacto.gAca}</li>
                <li>Titulo Trabajo: ${contacto.tTrabajo}</li>
            </ul>
            `;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jorgeme0996@gmail.com', // generated ethereal user
            pass: 'J0rg3m30996' // generated ethereal password
        },
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Servicio de Mailing" <jorgeme0996@gmail.com>', // sender address
        to: 'congreso.investigacion.uvm@gmail.com', // list of receivers
        subject: 'Nuevo Contacto', // Subject line
        html: output, // html body
        attachments: [
            {
                filename: `${contacto.file}`,
                content: `${contacto.tituloPonencia} - ${contacto.nombre} - ${contacto.uni}`
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Esta vivo")
});