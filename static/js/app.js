
// ****Codes below are Instructor Dom's starter code shown in office hour****
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    // Build bargraph
    d3.json("samples.json").then(data => {
        // console.log(data);

        // Pull values from dataset
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

// ****Codes I process******
// Build Bubble Chart
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then(data => {
        console.log(data);

         // Pull values from dataset
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        console.log(resultArray);
        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        // console.log(otu_ids);
        var otu_labels = result.otu_labels;
        // console.log(otu_labels);
        var sample_values = result.sample_values;
        console.log(sample_values);

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

// ****Codes I process******
function ShowMetadata(metadataId) {
    console.log(`ShowMetadata(${metadataId})`);

    d3.json("samples.json").then(data => {
        console.log(data);

        // Pull values from dataset
        var metadata = data.metadata;
        console.log(metadata)

        var resultArr = metadata.filter(m => m.id.toString() === metadataId);
        console.log(resultArr);
        var result = resultArr[0];
        console.log(result);

        // Process the location of the metadata into the 'Demo Info' section:
        var demoInfo = d3.select("#sample-metadata");
        console.log(demoInfo)

        // Clear the existing output
        demoInfo.html("");

        // Process the loop to showcase key/value 
        Object.entries(result).forEach(([key, value]) => {
            // console.log(`Key: ${key} and Value: ${value}`);
            var row = demoInfo.append("p").text(`${key}:${value}`)
        });
    })
}


    
// When choosing a diff subject on drop-down, it doesnt work as we need an event handler.
// Per index.html: onchange="optionChanged(this.value)" this is the event handler
// ****Codes below are Instructor Dom's starter code shown in office hour****
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

// ****Codes below are Instructor Dom's starter code shown in office hour****
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