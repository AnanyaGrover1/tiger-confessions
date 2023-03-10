// word cloud data
let scale1 = 2
let scale2 = 12
let wordCloudDict = {
    "1":
    [
        { word: "construction", size: 60/scale1 },
        { word: "like", size: 29/scale1 },
        { word: "going", size: 19 /scale1},
        { word: "brother", size: 17 /scale1},
        { word: "get", size: 16/scale1 },
        { word: "also", size: 13 /scale1},
        { word: "people", size: 13 /scale1},
        { word: "i'm", size: 12 /scale1},
        { word: "princeton", size: 12 /scale1},
        { word: "w", size: 12/scale1 },
        { word: "one", size: 11/scale1 },
        { word: "would", size: 11/scale1 },
        { word: "campus", size: 11 /scale1},
        { word: "companies", size: 11 /scale1},
        { word: "im", size: 10/scale1 },
        { word: "use", size: 10 /scale1},
        { word: "even", size: 10 /scale1},
        { word: "divestment", size: 10 /scale1},
        { word: "could", size: 10 /scale1},
        { word: "makes", size: 10 /scale1},
        { word: "see", size: 10/scale1 },
        { word: "every", size: 10 /scale1},
        { word: "noise", size: 10/scale1},
        { word: "time", size: 10 /scale1},
        { word: "much", size: 10 /scale1},
        { word: "year", size: 9 /scale1},
        { word: "new", size: 9 /scale1},
        { word: "know", size: 9 /scale1},
        { word: "room", size: 8 /scale1},
        { word: "fossil", size: 8 /scale1},
        { word: "still", size: 8/scale1},
        { word: "say", size: 8 /scale1},
        { word: "engage", size: 8 /scale1},
        { word: "core", size: 8 /scale1},
        { word: "way", size: 8/scale1 },
        { word: "something", size: 8 /scale1},
        { word: "really", size: 8/scale1 },
        { word: "first", size: 8 /scale1},

    ],
    "2": [
        { word: "final", size: 642/scale2 },
        { word: "like", size: 209 /scale2},
        { word: "class", size: 163 /scale2},
        { word: "get", size: 153 /scale2},
        { word: "people", size: 153 /scale2},
        { word: "im", size: 146 /scale2},
        { word: "know", size: 138 /scale2},
        { word: "3", size: 136/scale2 },
        { word: "grade", size: 132 /scale2},
        { word: "even", size: 120 /scale2},
        { word: "really", size: 118 /scale2},
        { word: "one", size: 115/scale2 },
        { word: "time", size: 110 /scale2},
        { word: "would", size: 108/scale2 },
        { word: "dont", size: 105/scale2 },
        { word: "think", size: 98 /scale2},
        { word: "exam", size: 91 /scale2},
        { word: "want", size: 90/scale2 },
        { word: "make", size: 87/scale2 },
        { word: "i'm", size: 84 /scale2},
        { word: "going", size: 84/scale2 },
        { word: "us", size: 84/scale2 },
        { word: "students", size: 81/scale2 },
        { word: "could", size: 80/scale2 },
        { word: "semester", size: 80/scale2 },
        { word: "anyone", size: 78 /scale2},
        { word: "much", size: 77/scale2 },
        { word: "got", size: 76/scale2},
        { word: "grades", size: 76 /scale2},
        { word: "feel", size: 75/scale2 },
        { word: "princeton", size: 74/scale2 },
        { word: "take", size: 73/scale2},
        { word: "classes", size: 71/scale2 },
        { word: "well", size: 70/scale2 },
        { word: "also", size: 69/scale2 },
        { word: "go", size: 69/scale2 },
        { word: "away", size: 63 /scale2},

    ]
}

let myColor = "#1a1a1a";
// set the dimensions and margins of the graph
let margin = { top: 10, right: 50, bottom: 30, left: 50 },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.selectAll(".mountain-chart")
    .append("svg")
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// set the dimensions and margins of the graph
let margin2 = { top: 10, right: 10, bottom: 10, left: 10 },
    width2 = 300 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;

// initialize the word clouds, there's probably a way to do this without a for loop
for (let decade in wordCloudDict) {
    // append the svg object to the body of the page
    let cloud = d3.select("#d" + decade).select(".word-cloud").append("svg")
        .attr("viewBox", "0 0 " + (width2 + margin2.left + margin2.right) + " " + (height2 + margin2.top + margin2.bottom))
        .append("g")
        .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    let layout = d3.layout.cloud()
        .size([width2, height2])
        .words(wordCloudDict[decade].map(function (d) { return { text: d.word, size: d.size * 2 }; }))
        .padding(10)        //space between words
        .rotate(0)       // rotation angle in degrees
        .fontSize(function (d) { return d.size; })      // font size of words
        .on("end", function (d) {
            draw(d, cloud);
        });
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud featurt are THE SAME from one word to the other can be here
    function draw(words) {
        cloud
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size; })
            .attr("text-anchor", "middle")
            .attr("class", "selectButton")
            .style("fill", myColor)
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
    }
}
//Read the data
d3.csv("https://assets.dailyprincetonian.com/projects.dailyprincetonian.com/140-years-prince-history/allwordsfreq.csv", function (data) {


    // Add X axis --> it is a date format
    let x = d3.scaleLinear()
        .domain([new Date(1880), new Date(2010)])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format('d'))).selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .style("fill", myColor)
        .attr("transform", function (d) {
            return "rotate(-50)";
        });

    // Initialize an Y axis and line, using arbitrary starting scale (the word "the")
    let y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
        return +d.the * 10;
    })]).range([height, 0]);
    let yAxis = d3.axisLeft().scale(y);
    svg.append("g")
        .style("stroke", myColor)
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "chart-title")
        .style("text-anchor", "middle")
        .text("Mentions per 100,000 words")
        .style("fill", myColor);


    let line = svg
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.area()
            .x(function (d) { return x(+d.timedecade) })
            .y0(height)
            .y1(function (d) { return y(+d.the * 10) })
        )
        .attr("stroke", function (d) { return myColor })
        .attr("class", "line")
        .style("stroke-width", 2)
        .style("fill", myColor)

    // A function that update the chart
    function update(button, selectedGroup, selectedDecade) {
        d3.select("#" + selectedDecade).select(".word-cloud").select(".selected").classed("selected",false);
        // selected the right chart elements for the decade
        let selectedSvg = d3.select("#" + selectedDecade).select(".mountain-chart svg g");
        let selectedLine = selectedSvg.select(".line");

        // Create new data with the selection?
        let dataFilter = data.map(function (d) { return { time: d.timedecade, value: d[selectedGroup] } })


        if(typeof dataFilter[0]['value'] == 'undefined') {
            d3.select("#" + selectedDecade).select(".error-msg")
            .text("\“" + selectedGroup + "\” was not included in our analysis because it was either not used frequently enough to be included in our analysis or was removed during data cleaning. If you're interested in seeing its usage over time, you can use the Princeton University Library Archive explorer.")
            .style("color", myColor)
            return false;
        }

        d3.select("#" + selectedDecade).select(".error-msg")
        .text("")

        y.domain([0, d3.max(data, function (d) {
            return +d[selectedGroup] * 10;
        })]);
        selectedSvg.selectAll(".myYaxis")
            .transition()
            .duration(1000)
            .call(yAxis);

        // Give these new data to update line
        selectedLine
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.area()
                .x(function (d) { return x(+d.time) })
                .y0(height)
                .y1(function (d) { return y(+d.value * 10) })
            )
            .attr("stroke", function (d) { return myColor })

        // update the chart header
        d3.select("#" + selectedDecade).select(".chart-header")
            .text("Frequency of \“" + selectedGroup + "\” over time")
            .attr("style", "color: #F8F4EA")
            var axisLabelX = 50;
            var axisLabelY = height / 2;


        // highlight selected group
        button.classList.add("selected")
    }

    // When the button is changed, run the updateChart function
    // or # on change
    d3.selectAll(".selectButton").on("click", function (d) {
        // recover the option that has been chosen
        let selectedWord = d3.select(this).text().toLowerCase().replace(/[^A-Za-z0-9]/g,"");
        // get id of container
        let selectedDecade = this.closest('.graph-block-container').id


        // run the updateChart function with this selected option
        update(this, selectedWord, selectedDecade)
    })

    d3.select(".lookupSubmit").on("click", function (d) {
        // recover the option that has been chosen
        d3.event.preventDefault();

        let selectedWord = d3.select(".lookupText").property("value").toLowerCase().replace(/[^A-Za-z0-9]/g,"");
        // get id of container
        let selectedDecade = this.closest('.graph-block-container').id
        // run the updateChart function with this selected option
        update(this, selectedWord, selectedDecade)
    })

    // VERY HACKY way to intialize all the mountain charts to the first word
    for(let decade in wordCloudDict){
        let word = wordCloudDict[decade][0]['word']
        let element = d3.select("#d" + decade)
                        .select(".word-cloud")
                        .selectAll(".selectButton")
                        .filter(function(){
                            return d3.select(this).text() == word
                        })
        update(element.node(), word.toLowerCase(), "d" + decade)
    }
    update(d3.select(".lookupSubmit").node(), "princetonian", "dlookup")
})



