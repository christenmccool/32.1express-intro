const { findMean, findMedian, findMode } = require('./mathServer')


describe("test math functions", function() {
    test('mean of empty array is NaN', function() {
        const res = findMean([]);
        expect(res).toEqual(NaN);
    })

    test('mean of single value calculated', function() {
        const res = findMean([5]);
        expect(res).toEqual(5);
    })

    test('mean calculated', function() {
        const res = findMean([1, 2, 3]);
        expect(res).toEqual(2);
    })

    test('median of empty array is NaN', function() {
        const res = findMedian([]);
        expect(res).toEqual(NaN);
    })

    test('median of even number of values calculated', function() {
        const res = findMedian([1, 2, 3, 4]);
        expect(res).toEqual(2.5);
    })
    
    test('median of odd number of values calculated', function() {
        const res = findMedian([1, 2, 3, 4, 5]);
        expect(res).toEqual(3);
    })

    test('mode of empty array is NaN', function() {
        const res = findMode([]);
        expect(res).toEqual(NaN);
    })

    test('mode calculated where frequency of each number is 1', function() {
        const res = findMode([1, 2, 3]);
        expect(res).toEqual([1,2,3]);
    })

    test('mode calculated', function() {
        const res = findMode([1, 2, 2]);
        expect(res).toEqual([2]);
    })

    test('mode calculated where multiple values have same frequency', function() {
        const res = findMode([1, 1, 2, 2]);
        expect(res).toEqual([1, 2]);
    })
})
