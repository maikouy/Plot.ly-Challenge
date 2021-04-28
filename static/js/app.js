console.log("apps.js loaded!");

// This is call a function stub --> Placeholder for the real 'Function'
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    // Build bargraph
    d3.json("samples.json").then(data => {
        console.log(data);
        // You can omit the console.log line up there bc thats just to check 
        // your work


        // Now is time to get value out of your data
        // We are ask to graph the 'samples' portion of the data(info)
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        // console.log(resultArray);
        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        // console.log(otu_ids);
        var otu_labels = result.otu_labels;
        // console.log(otu_labels);
        var sample_values = result.sample_values;
        // console.log(sample_values);
        
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        // Graphs
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    })
}

// *****WORK ON THIS PART NOW******
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then(data => {
        console.log(data);

        // Now is time to get value out of your data
        // We are ask to graph the 'samples' portion of the data(info)
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        // console.log(resultArray);
        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        // console.log(otu_ids);
        var otu_labels = result.otu_labels;
        // console.log(otu_labels);
        var sample_values = result.sample_values;
        // console.log(sample_values);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }

        var chartArray = [trace1];

        var chartLayout = {
            title: "Bacteria Cultures",
            xaxis: {title: "OTU_ID"},
            yaxis: {title: "Values"},
            showlegend: false,
            height: 600,
            width: 1200
        }

        Plotly.newPlot("bubble", chartArray, chartLayout);

    })
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}


    
// When choosing a diff subject on drop-down, it doesnt work as we need 
// an event handler.
// Per index.html: onchange="optionChanged(this.value)" this is the event handler

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
    
}

// Codes below are Dom's starter code shown in office hour:
function InitDashboard() {
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);
        });

        var id = sampleNames[0];

        // Draw the graphs and show metadata info
        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);

    });

}

InitDashboard();