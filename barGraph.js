var future_value_data_array = [];

window.addEventListener('load', onLoadCallback, false);

function onLoadCallback() {

    calculateFutureVal = function() {

      var principle_amnt = Number(document.getElementById("amount").value);
      var rate = Number(document.getElementById("interest_rate").value);
      var years = Number(document.getElementById("years").value);

      for(var i=1; i<=years; i++){
        var pow = Math.pow((1+rate), i);
        var future_value = principle_amnt * pow;
        future_value_data_array.push(future_value);
      }

      createBarGraphWithFVs(future_value_data_array);
      return false;
  }
}

function createBarGraphWithFVs(future_value_data_array) {

    var dataArray = future_value_data_array;
        minDataElem = Math.min(...dataArray);
        maxDataElem = Math.max(...dataArray);

    var width = 400;
        height = maxDataElem;

    var scaleHeight = d3.scaleLinear()
                        .domain([minDataElem, maxDataElem])
                        .range([1, 200]);

    var scaleWidth = d3.scaleBand()
                        .domain(dataArray.map(function (d, i) { return i; }))
                        .rangeRound([0, width])
                        .paddingInner(0.1)
                        .paddingOuter(0.5);

    var yAxisScale = d3.scaleLinear()
                       .domain([minDataElem, maxDataElem])
                       .range([200, 0]);

    var xAxisScale = d3.scaleLinear()
                       .domain([0, dataArray.length])
                       .range([0, width])

    var yAxis = d3.axisLeft(yAxisScale);
    var xAxis = d3.axisBottom(xAxisScale).ticks(dataArray.length);

    var barCanvas = d3.select(".chart")
                      .append("svg")
                      .attr("width", width + 40)
                      .attr("height", height)
                      .append("g")
                        .attr("transform", "translate(50, 50)");

    barCanvas.call(yAxis);

    barCanvas.append("g")
                .attr("transform", "translate(0, 200)")
              .call(xAxis);

    barCanvas.selectAll("rect")
             .data(dataArray, function(d, i) { console.log('' + i + '-' + d); return '' + i + '-' + d; })
             .enter()
                .append("rect")
                .attr("height", function(d) { return scaleHeight(d); })
                .attr("width", function () { console.log(scaleWidth.bandwidth()); return scaleWidth.bandwidth(); })
                .attr("fill", "steelblue")
                .attr("x", function(d, i) { return scaleWidth(i); })
                .attr("y", function(d) { return (200-scaleHeight(d)) });

}
