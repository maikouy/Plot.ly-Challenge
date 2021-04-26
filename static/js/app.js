console.log("apps.js loaded!");

// This is call a function stub --> Placeholder for the real 'Function'
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

}


function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
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

        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);

    });

    // Update the bargraph
    // Update the bubblechart
    // Update the demo info
}

InitDashboard();