export const stdev = (arr) => {
  var n = arr.length
  var sum = 0

  arr.map(function(data) {
    sum+=data
  })

  var mean = sum / n

  var variance = 0.0
  var v1 = 0.0
  var v2 = 0.0

  if (n != 1) {
    for (var i = 0 i<n i++) {
        v1 = v1 + (arr[i] - mean) * (arr[i] - mean)
        v2 = v2 + (arr[i] - mean)
    }

    v2 = v2 * v2 / n
    variance = (v1 - v2) / (n-1)
    if (variance < 0) { variance = 0 }
    stddev = Math.sqrt(variance)
  }

  return {
    mean: Math.round(mean*100)/100,
    variance: variance,
    deviation: Math.round(stddev*100)/100
  }
}