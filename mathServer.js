const express = require('express');
const fs = require('fs');

const ExpressError = require('./expressError')

const app = express();

function strToNumArr(numsStr) {
    let numsArr = numsStr.split(",")
    numsArr = numsArr.map(el => {
        const element = parseInt(el)
        if (Number.isNaN(element)) {
            throw new ExpressError(`${el} is not a number`, 400);
        }
        return element;
    });
    return numsArr;
}

function findMean(numsArr) {
    const sum = numsArr.reduce((accum, curr) => accum + curr);
    return sum / numsArr.length;
}

function findMedian(numsArr) {
    numsArr.sort((a, b) => (a - b));
    if (numsArr.length % 2 == 1) {
        const midInd = (numsArr.length - 1) / 2;
        return numsArr[midInd];
    } else {
        const midInd = (numsArr.length) / 2  - 1;
        const midVals = [numsArr[midInd], numsArr[midInd + 1]];
        return findMean(midVals);
    }
}

function findMode(numsArr) {
    const count = {};
    numsArr.forEach(element => {
        if (count[element]) {
            count[element]++;
        } else {
            count[element] = 1;
        }
    })

    const numsList = Array.from(new Set(numsArr));

    let maxCount = 1;

    const mode = numsList.reduce((accum, curr) => {
        if (count[curr] > maxCount) {
            accum = [curr];
            maxCount = count[curr];
        } else if ( count[curr] === maxCount) {
            accum.push(curr);
        }
        return accum;
    }, []);
    
    return mode;
}

app.get("/mean", function(req, res, next){
    try {
        const numsStr = req.query.nums;
        if (!numsStr) throw new ExpressError("Numbers (nums) are required.", 400);

        const numsArr = strToNumArr(numsStr)
        const mean = findMean(numsArr);

        return res.json({ mean });
    } catch (err) {
        return next(err);
    }
})

app.get("/median", function(req, res, next){
    try {
        const numsStr = req.query.nums;
        if (!numsStr) throw new ExpressError("Numbers (nums) are required.", 400);

        const numsArr = strToNumArr(numsStr)
        const median = findMedian(numsArr);

        return res.json({ median });
    } catch (err) {
        return next(err);
    }
})

app.get("/mode", function(req, res, next){
    try {
        const numsStr = req.query.nums;
        if (!numsStr) throw new ExpressError("Numbers (nums) are required.", 400);

        const numsArr = strToNumArr(numsStr)
        const mode = findMode(numsArr);

        return res.json({ mode });
    } catch (err) {
        return next(err);
    }
})

app.get("/all", function(req, res, next){
    console.log(req.headers)
    try {
        const timestamp = new Date().toISOString();
        const numsStr = req.query.nums;
        if (!numsStr) throw new ExpressError("Numbers (nums) are required.", 400);

        const numsArr = strToNumArr(numsStr)
        const mean = findMean(numsArr);
        const median = findMedian(numsArr);
        const mode = findMode(numsArr);

        if (req.query.save) {
            fs.writeFile('results.json', JSON.stringify({timestamp, numsArr, mean, median, mode}), 'utf8', (err, data) => {
                if (err) {
                    throw new ExpressError(`${err}`, 400);
                }
                console.log(`data saved to file results.json`)
            })
        }
        return res.json({ numsArr, mean, median, mode });

        } catch (err) {
        return next(err);
        }
})


app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    });
});

app.listen(3000, () => {
    console.log('Server open on port 3000.')
})




