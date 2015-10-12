var requirejs = require('requirejs'),
    cfgs = require('./r.config');

for (var i in cfgs) {
    if (cfgs[i].almond && cfgs[i].wrap) {
        cfgs[i].wrap.startFile.push('wrap/almond.js');
    }
    requirejs.optimize(cfgs[i], function(buildResponse) {
        //buildResponse is just a text output of the modules
        //included. Load the built file for the contents.
        //Use config.out to get the optimized file contents.
        var contents = fs.readFileSync(cfgs[i].out, 'utf8');
        console.log('build ' + cfgs[i].name + ' success!');
    }, function(err) {
        console.log(err);
    });
}
