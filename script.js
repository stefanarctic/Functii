const initialDate = Date.now();

let mouseX = 0, mouseY = 0;

document.onmousemove = (e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

let func = "sin(x)";

const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan, tg = tan;
const cot = x => 1 / Math.tan(x), ctg = cot;
const asin = Math.asin, arcsin = asin;
const acos = Math.acos, arccos = acos;
const atan = Math.atan, arctg = atan;
const arcctg = x => Math.PI / 2 - atan(x), acot = arcctg;
const PI = Math.PI, pi = PI;

let f = x => 0;

const evalFunc = () => {
    try {
        f = x => {
            const funcText = func.replace(/x/g, `(${x})`);
            return eval(funcText) * graph.amp;
        };
    } catch (error) {
        console.error("Function evaluation error:", error);
        f = () => 0;
    }
};

const graph = {
    size: 0,
    centerX: 0,
    centerY: 0,
    svg: null,
    data: [],
    amp: 50,
    lineThickness: 2,
    graphThickness: 2,
    zoom: null,
    currentTransform: d3.zoomIdentity,
    
    init: () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        graph.centerX = width / 2;
        graph.centerY = height / 2;
        graph.size = Math.min(width, height) - 40;
        graph.data = [];
    },
    
    clear: () => {
        if (graph.svg) graph.svg.selectAll("*").remove();
    },
    
    renderBody: () => {
        if (!graph.svg) {
            graph.svg = d3.select("body")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("background-color", "black");
            
            graph.zoom = d3.zoom()
                .scaleExtent([0.5, 5])
                .on("zoom", (e) => {
                    graph.currentTransform = e.transform;
                    d3.select(".zoom-group").attr("transform", e.transform);
                });
            
            graph.svg.call(graph.zoom);
        }
        
        let zoomGroup = graph.svg.select(".zoom-group");
        if (zoomGroup.empty()) {
            zoomGroup = graph.svg.append("g").attr("class", "zoom-group");
        }
        zoomGroup.attr("transform", graph.currentTransform);
    },
    
    drawAxes: () => {
        const axisGroup = graph.svg.select(".zoom-group");
        axisGroup.append("line")
            .attr("x1", 0)
            .attr("y1", graph.centerY)
            .attr("x2", window.innerWidth)
            .attr("y2", graph.centerY)
            .attr("stroke", "white")
            .attr("stroke-width", graph.lineThickness);
        
        axisGroup.append("line")
            .attr("x1", graph.centerX)
            .attr("y1", 0)
            .attr("x2", graph.centerX)
            .attr("y2", window.innerHeight)
            .attr("stroke", "white")
            .attr("stroke-width", graph.lineThickness);
    },
    
    drawGraph: () => {
        graph.data = [];
        const step = 2;
        for (let x = -graph.centerX; x < graph.centerX; x += step) {
            graph.data.push({ x: graph.centerX + x, y: graph.centerY - f(x / 50) * 50 });
        }

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasis);

        graph.svg.select(".zoom-group").append("path")
            .datum(graph.data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", graph.graphThickness)
            .attr("d", line);
    },
    
    redrawGraph: () => {
        graph.clear();
        graph.renderBody();
        graph.drawAxes();
        graph.drawGraph();
    }
};

const zoomIn = () => graph.svg.transition().duration(200).call(graph.zoom.scaleBy, 1.2);
const zoomOut = () => graph.svg.transition().duration(200).call(graph.zoom.scaleBy, 0.8);

window.onload = () => {
    evalFunc();
    graph.init();
    graph.redrawGraph();
};

window.onresize = () => {
    graph.init();
    graph.redrawGraph();
};

window.onkeydown = e => {
    if (e.key === '+') zoomIn();
    if (e.key === '-') zoomOut();
};