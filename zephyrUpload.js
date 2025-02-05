import report from './.tmp/json/login-to-bp_17387684499738591.json' assert {type: 'json'};
import axios from 'axios'


const rep = report
var numberOfTestCases
var allStatusesOfSteps = []
var tCase = 0


var statusName
var projectKey = "BMP"
var testCaseKey = "BMP-T192"
var testCycleKey = "BMP-R2"
var testScriptResults = []

var executionBody = {
    statusName,
    projectKey,
    testCaseKey,
    testCycleKey,
    testScriptResults
}

var stepStatus = {}

//Array of all statuses for one testcase
rep.forEach(function (item) {
    numberOfTestCases = item.elements.length
    console.log("Number of testcases = " + numberOfTestCases + '\n')
})

//Repeat testcases number times
do {
    console.log("TCase = " + (tCase + 1))
    allStatusesOfSteps = []
    
    rep.forEach(function (item) {

        //Generate steps for each testcase
        item.elements[tCase].steps.forEach(function (results) {
            allStatusesOfSteps.push(results.result.status)
        })

        console.log("STATUSESSS: " + allStatusesOfSteps)
            //Werify every step status and generate top status
            testScriptResults = []
            for (let i = 1; i < allStatusesOfSteps.length - 1; i++) {
                if (allStatusesOfSteps[i] == "passed") {
                    statusName = "Pass"
                    testScriptResults.push({statusName: "Pass"})
                } else {
                    statusName = "Fail"
                    testScriptResults.push({statusName: "Fail"})
                    break;
                }
            }
            console.log("Step status " + JSON.stringify(testScriptResults))
            executionBody.testScriptResults = testScriptResults
            // executionBody.projectKey = projectKey
            executionBody.statusName = statusName
            // executionBody.testCaseKey = testCaseKey
            // executionBody.testCycleKey = testCycleKey
            console.log("API " + JSON.stringify(executionBody))


            axios({
                method: 'post',
                url: 'https://api.zephyrscale.smartbear.com/v2/testexecutions',
                headers: {Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL2FsaWFuemEuYXRsYXNzaWFuLm5ldCIsInVzZXIiOnsiYWNjb3VudElkIjoiNzEyMDIwOjYyNTY0YWJhLTkzMTMtNGU5Mi04NWY1LWIyNzBkZDg5ZGE2YyIsInRva2VuSWQiOiJkODhjNzYzYS03YmRmLTRjM2YtOWE3Mi02NTk1ZWNmMWQwNGUifX0sImlzcyI6ImNvbS5rYW5vYWgudGVzdC1tYW5hZ2VyIiwic3ViIjoiYWxpYW56YS5hdGxhc3NpYW4ubmV0IiwiZXhwIjoxNzcwMTMzOTMwLCJpYXQiOjE3Mzg1OTc5MzB9.oeS32EQc5AdjqbH_r2ervr1jVQPKIWRXxSDLPkwupxc"}, 
                data: 
                    executionBody
                
              });

           
                // axios.post('https://api.zephyrscale.smartbear.com/v2/testexecutions', {
                //     withCredentials: true
                // }, {
                //     headers: {
                //         Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL2FsaWFuemEuYXRsYXNzaWFuLm5ldCIsInVzZXIiOnsiYWNjb3VudElkIjoiNzEyMDIwOjYyNTY0YWJhLTkzMTMtNGU5Mi04NWY1LWIyNzBkZDg5ZGE2YyIsInRva2VuSWQiOiJkODhjNzYzYS03YmRmLTRjM2YtOWE3Mi02NTk1ZWNmMWQwNGUifX0sImlzcyI6ImNvbS5rYW5vYWgudGVzdC1tYW5hZ2VyIiwic3ViIjoiYWxpYW56YS5hdGxhc3NpYW4ubmV0IiwiZXhwIjoxNzcwMTMzOTMwLCJpYXQiOjE3Mzg1OTc5MzB9.oeS32EQc5AdjqbH_r2ervr1jVQPKIWRXxSDLPkwupxc"
                //     },
                //     data: 
                //         executionBody
                        // projectKey,
                        // statusName,
                        // testCaseKey,
                        // testCycleKey,
                        // testScriptResults,
                        // environmentName: "Chrome",
                        // actualEndDate: "1980-08-29T15:41:09.447Z",
                        // executionTime: 120000,
                        // executedById: "712020:62564aba-9313-4e92-85f5-b270dd89da6c",
                        // assignedToId: "712020:62564aba-9313-4e92-85f5-b270dd89da6c"
                    
                // }).then(response => {
                //     console.log(response.data)
                // })
            


            // axios({
            //     method: 'post',
            //     url: "https://api.zephyrscale.smartbear.com/v2/testexecutions",
            //     headers: {Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL2FsaWFuemEuYXRsYXNzaWFuLm5ldCIsInVzZXIiOnsiYWNjb3VudElkIjoiNzEyMDIwOjYyNTY0YWJhLTkzMTMtNGU5Mi04NWY1LWIyNzBkZDg5ZGE2YyIsInRva2VuSWQiOiJkODhjNzYzYS03YmRmLTRjM2YtOWE3Mi02NTk1ZWNmMWQwNGUifX0sImlzcyI6ImNvbS5rYW5vYWgudGVzdC1tYW5hZ2VyIiwic3ViIjoiYWxpYW56YS5hdGxhc3NpYW4ubmV0IiwiZXhwIjoxNzcwMTMzOTMwLCJpYXQiOjE3Mzg1OTc5MzB9.oeS32EQc5AdjqbH_r2ervr1jVQPKIWRXxSDLPkwupxc"}, 
            //     data: {
            //       executionBody
            //     }
            //   });

        })
        console.log("Steps = " + allStatusesOfSteps.length)
        console.log("TOP " + statusName + '\n')
        
    
    
    tCase++
} while (tCase < numberOfTestCases)