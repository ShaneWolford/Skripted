const express = require('express');

// Add Gmail login system ()
// Herberto, you are super retarded please learn how to code.



const app = express();
const fs = require('fs');
const publicDir = __dirname + '/html/';
const path = require('path');

// Google Login System

app.set('view engine', 'ejs');
var access_token = "";
// Rest of the code

// Parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Specify the 'views' directory
app.set('views', path.join(__dirname, 'views'));

// Serve the HTML form at the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/login', (req, res) => {
  res.render(__dirname + '/views/index.ejs',{client_id: clientID});
});
app.get('/upload', (req, res) => {
  res.sendFile(publicDir + 'upload.html');
});
app.get('/test', (req, res) => {
  res.sendFile(publicDir + 'test.html');
});
app.get('/test2', (req, res) => {
  res.sendFile(publicDir + 'test2.html');
});

















// index.js

// Import the axios library, to make HTTP requests
const axios = require('axios')
// This is the client ID and client secret that you obtained
// while registering on github app
const clientID = '218a432ecbe4f2b11635'
const clientSecret = '53945c398a6bc26f9566ed15929d74db51d65c50 '

// Declare the callback route
app.get('/github/callback', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.render('views/success',{ userData: response.data });
  })
});








// Handle form submission
app.post('/upload', (req, res) => {
  const title = req.body.title;
  const skript = req.body.skript;
  saveSkriptToFile(title, skript);
  console.log('Title:', title);
  console.log('Skript:', skript);

  res.send('<h3><a href="https://skripted--toxicrocker.repl.co//skripts">Click here to go back to page.</h3></a>');




});

// ... (existing code)

function saveSkriptToFile(title, skript) {
  const num = Math.floor(Math.random() * (100000000 - 1000000)) + 1000000;
  const filename = title
  const filePath = __dirname + '/Skripts/' + filename + '.sk';
  const titlePath = __dirname + '/Skripts/' + title + `.title`;

  fs.writeFile(filePath, skript, (err) => {
    if (err) {
      console.error('Error saving skript:', err);
    } else {
      console.log('Skript saved:', filePath);
    }
  });

  fs.writeFile(titlePath, title, (err) => {
    if (err) {
      console.error('Error saving skript:', err);
    } else {
      console.log('Skript saved:', filePath);
    }
  });

}




app.get('/skripts', (req, res) => {
  const scripts = getScriptList();
  const title = getSkript()
  res.render('list', { title, scripts });
});

app.get('/skripts/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const skriptContent = getSkriptContent(title); // Correct usage of the function
  res.render('view', { title, skriptContent });
});


function getScriptList() {
  const files = fs.readdirSync(__dirname + '/Skripts');
  const scriptList = files
    .filter(file => file.endsWith('.title')) // Include only .title files
    .map(file => {
      const title = file.replace('.title', ''); // Extract the script title
      const filePath = __dirname + '/Skripts/' + file;
      const content = fs.readFileSync(filePath, 'utf-8'); // Read the content of .title file
      return { title, content };
    });
  return scriptList;
}



function getSkriptContent(title) {
  const filePath = __dirname + '/Skripts/' + title;
  try {
    const skriptContent = fs.readFileSync(filePath, 'utf-8');
    return skriptContent;
  } catch (error) {
    console.error('Error reading skript:', error);
    return 'Skript not found. ' + filePath;
  }
}


function getSkript() {
  const files = fs.readdirSync(__dirname + '/Skripts/');
  const scriptList = files
    .filter(file => file.endsWith('.sk')) // Include only .title files
    .map(file => {
      const title = file.replace('.sk', ''); // Extract the script title
      const filePath = __dirname + '/Skripts/' + file;
      const content = fs.readFileSync(filePath, 'utf-8'); // Read the content of .title file
      return { title, content };
    });
  return scriptList;
}




app.get('*', function(req, res) {
  res.sendFile(__dirname + '/html/404.html', 404)
});

app.listen(3000, () => {
  console.log('server started');
})