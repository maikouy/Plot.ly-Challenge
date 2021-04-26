console.log("apps.js loaded!");



// Codes below are Dom's starter code shown in office hour:
function InitDashboard() {
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(function(data) {
        console.log(data);

    });

    // Update the bargraph
    // Update the bubblechart
    // Update the demo info
}

InitDashboard();