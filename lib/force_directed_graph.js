var d3 = require('d3')

module.exports = function draw_force_directed_graph(options) {
    var width = 190
    var height = 160

    var svg = options.parent.append('svg')
      .attr('width', '30%')
        .attr('preserveApsectRatio', 'xMidYMid')
        .attr('viewBox', [0,0,width,height].join(' '))
        .style('background-color', 'rgb(240,240,240)')

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) {
            return d.id;
        }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    var hmm = require('./HMM.js')()
    hmm.load(options.data)
    hmm.train()
    console.log(hmm.data())

    // nodes are the notes  + rest
    var data = hmm.data()

    var graph = {
        nodes: [],
        links: []
    }

    var note_lut = require('./scale_note.js')()
    console.log(note_lut)
    console.log(note_lut[45])

    Object.keys(data).forEach(function(note_name){
      console.log(note_name)
      graph.nodes.push({
        id: note_name,
        group: 0
      })
      Object.keys(data[note_name]).forEach(function(target_note){
        graph.links.push({
          source: note_name,
          target: note_lut[target_note].name,
          value: Math.floor(data[note_name][target_note])
        })
      })
    })
    // nodes [ {"id": "Myriel", "group": 1}, ... ]
    // links [ {"source": "Napoleon", "target": "Myriel", "value": 1} ]

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr('stroke', 'rgba(200,200,200,1)')
        .attr("stroke-width", function(d) {
          return 1
            return Math.sqrt(d.value);
        });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", function(d) {
            return color(d.group);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    simulation.nodes(graph.nodes)
        .on("tick", ticked)

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link.attr("x1", function(d) { return d.source.x })
            .attr("y1", function(d) { return d.source.y })
            .attr("x2", function(d) { return d.target.x })
            .attr("y2", function(d) { return d.target.y })

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
