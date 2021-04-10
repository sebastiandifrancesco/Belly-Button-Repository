//creating function for all the demographic info
function demoInfo(id){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata);

        //filter demographic info data by id
        var mdata = metadata.filter(info => info.id.toString() === id)[0];

        var panelBody = d3.select("#sample-metadata");

        //empty the demographic info panel each time before getting new data
        panelBody.html("");
        
        //append each json object to the html
        Object.entries(mdata).forEach((key)=>{
            panelBody.append("p").text(key[0] + ": " + key[1]);
        });
    });
};

//function for plots
function plots(id) {
    //get json data
    d3.json("samples.json").then((data)=> {
        //console.log(data)
        
        //filter wfreq value by id
        var wfreq = data.metadata.filter(f => f.id.toString() === id)[0];
        wfreq = wfreq.wfreq;
        console.log("Washing Freq: " + wfreq);
        
        //filter samples values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        //console.log("Samples: " + samples);
  
        //get the top 10 samples values
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
        console.log("top 10 sample: " + samplevalues);
  
        //get top 10 otu ids and reverse them
        var OTU = (samples.otu_ids.slice(0, 10)).reverse();
        
        //reformat the otu id's
        var OTU_id = OTU.map(d => "OTU " + d)
  
        console.log("OTU IDS: " + OTU_id);
  
  
        //get the top 10 labelsand reverse them
        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels);
  
        //create trace variable
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'Blue'},
            type:"bar",
            orientation: "h",
        };
  
        //create data variable
        var data = [trace];
    
        //create the bar plot
        Plotly.newPlot("bar", data);
      
        //bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        //set the layout for bubble plot
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };
  
        //creating data variable 
        var data1 = [trace1];
  
        //create the bubble plot
        Plotly.newPlot("bubble", data1, layout_b); 
  
        //guage chart
        var data_g = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: {text: `Belly Button Washing Frequency`},
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    {range: [0, 1], color: "white"},
                    {range: [1, 2], color: "white"},
                    {range: [2, 3], color: "white"},
                    {range: [3, 4], color: "white"},
                    {range: [4, 5], color: "white"},
                    {range: [5, 6], color: "white"},
                    {range: [6, 7], color: "white"},
                    {range: [7, 8], color: "white"},
                    {range: [8, 9], color: "white"}
                  ]}
              
          }
        ];
        var layout_g = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data_g, layout_g);
      });
  }  

function dropdown() {
    //read the data
    d3.json("samples.json").then((data)=> {
        //console.log(data);

        //get the name id to the dropdown menu
        data.names.forEach((name) => {
            d3.select("#selDataset")
            .append("option")
            .text(name)
            .property("value");
        });
        plots(data.names[0]);
        demoInfo(data.names[0]);
    });
};
dropdown();

//change event function
function optionChanged(id){
    plots(id);
    demoInfo(id);
};