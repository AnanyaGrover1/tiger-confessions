import { arr } from "./array3.js";


var value = document.getElementById("field_5").value;

// "search" bar
document.getElementById('search').addEventListener("click", function () {
    const val = document.getElementById('field_5').value;

    // if val is in array of words, update the svg accordingly
    // can't update both the word and the freq or counts parameter
    // simultaneously, so the graph and switch will revert back to
    // freq upon new search
    if (arr.indexOf(val) !== -1) {
        value = val;

        document.getElementById("switch_5").checked = false;
        update('graphs/tc_data_for_web_with_dates.csv', value)
    } else {
        alert("this word is not in the database!")
    }
})



// switching between freq and count graphs
document.getElementById('switch_5').addEventListener("click", function() {
        if(document.getElementById('switch_5').checked){
            update('graphs/tc_data_for_web_with_dates.csv', value)
        } else {
          update('graphs/tc_data_for_web_fractions.csv', value)
        }
      });

// margins for the graph
var margin = {top: 30, right: 30, bottom: 100, left: 15},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
var svg = d3.select("#my_dataviz_5")
  .append("svg")
  .attr("viewBox", `-${margin.left} -${margin.top} ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// initialize x and y axes
var x = d3.scaleTime()
    .range([ 0, width ]);

var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")

var y = d3.scaleLinear()
    .range([ height, 0 ]);

var yAxis = svg.append("g")


// update function
function update(chartType, field){

// clear the previous line and label
svg.selectAll("path").remove()
d3.select("#label").remove()

// add a label specifying the word
svg.append("text")
.attr("id", "label")
.attr("text-anchor", "middle")
.attr("x", width/2)
.attr("y", height + 40)
.text("word: " + field);

//Read the data
d3.csv(chartType,

  // formatting variables from csv
  function(d){
    return { month : d3.timeParse("%Y-%m")(d.Month), value : d[field]}
  },


  function(data) {


// update x axis
    x.domain(d3.extent(data, function(d) { return +d.month; }))
    xAxis.call(d3.axisBottom(x));

// Add y axis
    y.domain([0, d3.max(data, function(d) { return +d.value; })])
    yAxis.transition().duration(1000).call(d3.axisLeft(y));


    // Add the line
    svg.append("path")
      .datum(data)
      .transition().duration(1000)
      .attr("fill", "none")
      .attr("stroke", "brown")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.month) })
        // .y0(height)
        .y(function(d) { return y(d.value) })

        )



})
}


// default


update('tc_data_for_web_fractions.csv', value)