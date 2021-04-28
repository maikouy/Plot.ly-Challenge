// *****DO THIS PART NOW******
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then(data => {
        console.log(data);
        // // You can omit the console.log line up there bc thats just to check 
        // // your work

        // // Now is time to get value out of your data
        // // We are ask to graph the 'samples' portion of the data(info)
        // var samples = data.samples;
        // var resultArray = samples.filter(s => s.id == sampleId);
        // // console.log(resultArray);
        // var result = resultArray[0];
        // // console.log(result);

        // var otu_ids = result.otu_ids;
        // // console.log(otu_ids);
        // var otu_labels = result.otu_labels;
        // // console.log(otu_labels);
        // var sample_values = result.sample_values;
        // // console.log(sample_values);

        // Graphs
        var trace1 = {
            x: otu_ids,
            y: samples,
            text: ['otu_labels']
            mode: 'markers',
            marker: {
                size: ['samples'],
                color: ['otu_ids']
            }
        };

        var barArray = [trace1];

        var Layout = {
            title: "Top 10 Bacteria Cultures Found",
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot("myDiv", data, Layout);
    })
}
