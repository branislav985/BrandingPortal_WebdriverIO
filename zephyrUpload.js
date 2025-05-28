import report from './.tmp/json/user-profile_17430762567612515.json' assert {type: 'json'};
import axios from 'axios'


const rep = report
var numberOfTestCases
var allStatusesOfSteps = []
var tCase = 0


var statusName
var projectKey = "BMP"
var testCaseKey
var testCycleKey
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
    testScriptResults = []
    rep.forEach(function (item) {

        //Generate Test Cycle key
        testCycleKey = (item.elements[tCase].tags[0].name).slice(1)

        //Generate Testcase key
        testCaseKey = (item.elements[tCase].tags[1].name).slice(1)

        //Generate steps for each testcase
        item.elements[tCase].steps.forEach(function (results) {
            allStatusesOfSteps.push(results.result.status)
        })

        //Verify every step status and generate top status
        //To avoid Before and After steps from JSON report - i=1; i<allStatusesOfSteps.length - 1
        for (let i = 1; i < allStatusesOfSteps.length - 1; i++) {
            switch (allStatusesOfSteps[i]) {
                case "passed":
                    statusName = "Pass"
                    testScriptResults.push({ statusName: "Pass" });
                    break;
                case "failed":
                    statusName = "Fail"
                    testScriptResults.push({ statusName: "Fail" });
                    break;
                default:
                    testScriptResults.push({ statusName: "Not Executed" })
                    break;
            }
        }
        console.log("Step status " + JSON.stringify(testScriptResults))
        executionBody.testScriptResults = testScriptResults
        // executionBody.projectKey = projectKey
        executionBody.statusName = statusName
        executionBody.testCaseKey = testCaseKey
        executionBody.testCycleKey = testCycleKey
        console.log("API " + JSON.stringify(executionBody))

        try {
            axios({
                method: 'post',
                url: 'https://api.zephyrscale.smartbear.com/v2/testexecutions',
                headers: { Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL2FsaWFuemEuYXRsYXNzaWFuLm5ldCIsInVzZXIiOnsiYWNjb3VudElkIjoiNzEyMDIwOjYyNTY0YWJhLTkzMTMtNGU5Mi04NWY1LWIyNzBkZDg5ZGE2YyIsInRva2VuSWQiOiJkODhjNzYzYS03YmRmLTRjM2YtOWE3Mi02NTk1ZWNmMWQwNGUifX0sImlzcyI6ImNvbS5rYW5vYWgudGVzdC1tYW5hZ2VyIiwic3ViIjoiYWxpYW56YS5hdGxhc3NpYW4ubmV0IiwiZXhwIjoxNzcwMTMzOTMwLCJpYXQiOjE3Mzg1OTc5MzB9.oeS32EQc5AdjqbH_r2ervr1jVQPKIWRXxSDLPkwupxc" },
                data:
                    executionBody
            }).then((response) => {
                // console.log(response.status)
            });
        } catch (response) {
            // console.log(response.data)
        }
        
    })
    console.log("Steps = " + (allStatusesOfSteps.length - 2))
    console.log("TOP Status " + statusName + '\n')
    tCase++
} while (tCase < numberOfTestCases)