azure-template-breaktweak
========

NodeJs based solution which reads azure resource group template and process it to randomly tweak/remove some properties from each of the resource which can be used further to test Azure synchronisation for Error handing.

Installing 
-------------------

    Install nodejs 
    Run npm install
    
Usage
-------------------
Make sure you have a template (exported RG) located in template directory.

    Run node app.js
    Application will run by default on port 9000 (change config/config.js)
    http://localhost:9000/api?file=<FILENAME_IN_TEMPLATE_DIR>&original=true // to get original version
    http://localhost:9000/api?file=<FILENAME_IN_TEMPLATE_DIR> // to get tweaked version
    
    
