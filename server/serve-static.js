const express = require('express');
const app = express();
const path = require('path');

const _root = path.resolve(__dirname, '..');

// returns root file path adding deeper file paths from the parameters of the function
// example usage: helpers.root('dist') OR helpers.root('dist', 'nestedFolder', etc...) // returns root_of_project_file_path/dist
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

app.use(express.static(root('build')));
app.all('*', (req, res, next) => {
    res.sendFile('index.html', {
        root: root('build'),
    });
});

app.listen(3000);
