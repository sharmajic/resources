
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing items into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('file.json', 'utf8'));
console.log(typeof allMovies);
allMovies.forEach(function(myitem) {
    
    var params = {
        TableName: "cicd-SecurityModules",
        Item: myitem
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", myitem.application_id, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", myitem.application_id);
       }
    });
});

