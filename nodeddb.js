
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
var mydata=""
AWS.config.update({
    region: "us-east-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "dev-SecurityModules",
    FilterExpression: "application_id = :appid",
    ExpressionAttributeValues: {
         ":appid": "DEFAULT_PROTECTONCE"
    }
};

var params1 = {
    TableName: "dev-SecurityModules",
    KeyConditionExpression: "application_id = :appid",
    ExpressionAttributeValues: {
         ":appid": "DEFAULT_PROTECTONCE"
    }
};

docClient.query(params1, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        console.log(typeof data)
        mydata=JSON.stringify(data)
        console.log(typeof mydata)
        fs.writeFile("./file", mydata, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    }
});

console.log("Scanning Movies table.");
// results=docClient.scan(params, onScan);
// results=docClient.scan(params);
// console.log(results)
const fs = require('fs');



function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        console.log(data);

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
