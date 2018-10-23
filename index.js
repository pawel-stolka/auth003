let express = require('express')
// morgan = require('morgan');
var socketIo = require('socket.io'),
    path = require('path'),
    PORT = process.env.PORT || 8008, // settings.common.port,
    INDEX = path.join(__dirname, 'index.html')
    // server = require('http'),

    // app = express();
    // app.use(morgan('dev'))
    // app
    //     .use((req, res) => res.sendFile(INDEX))
    //     .listen(port, () => {
    //         console.log(` ===> server is listening at =====> port ${port}`)
    //     })

    // app.get('/', (req, res) => {
    //     // res.render('index');
    //     res.send('hi! everything in Auth4 API3 is working great!')
    // })

// fake
var server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));


let io = socketIo(server)
io.on('connection', (socket) => {
    console.log('Connected client on port %s.', PORT);

    socket.on('message', (m) => {
        console.log('[server](message): %s')//, JSON.stringify(m));
        io.emit('message', m);
    });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected...')
        // socket.broadcast.emit('message', { message: 'user disconnected'});
    })
        
})

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
