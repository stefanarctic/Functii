
const svg = d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("background-color", "black");

const initialDate = Date.now();

let mouseX = 0, mouseY = 0;

document.onmousemove = (e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})


const f = x => {
    return x * x;
}

const initialX = document.body.clientWidth / 8;
const initialY = document.body.clientHeight / 1.1;
const endX = initialX + 650;
const endY = initialY - 650;

const draw = () => {
    svg.append("line")
        .attr("x1", initialX)
        .attr("y1", initialY)
        .attr("x2", initialX)
        .attr("y2", endY)
        .attr("stroke", "white")
        .attr("stroke-width", 5);
    svg.append("line")
        .attr("x1", initialX)
        .attr("y1", initialY)
        .attr("x2", endX)
        .attr("y2", initialY)
        .attr("stroke", "white")
        .attr("stroke-width", 5);
    svg.append("circle")
        .attr("cx", initialX)
        .attr("cy", initialY)
        .attr("r", 8)
        .attr("fill", "white");
    svg.append("text")
        .attr("x", initialX - 40)
        .attr("y", initialY + 30 )
        .text("O")
        .attr("font-size", "35px")
        .attr("fill", "white");
    
    svg.append("text")
        .attr("x", endX - 20)
        .attr("y", initialY + 13)
        .text(">")
        .attr("font-size", "40px")
        .attr("font-weight", "1200")
        .attr("fill", "white");
    
    svg.append("text")
        .attr("transform", `rotate(-90 ${initialX} ${endY})`)
        .attr("x", initialX - 5)
        .attr("y", endY + 13)
        .text(">")
        .attr("text-anchor", "middle")
        .attr("font-size", "40px")
        .attr("font-weight", "1200")
        .attr("fill", "white");

    svg.append("text")
        .attr("x", endX - 20)
        .attr("y", initialY + 40)
        .text("x")
        .attr("font-size", "35px")
        .attr("fill", "white");
    
    svg.append("text")
        .attr("x", initialX - 30)
        .attr("y", endY + 40)
        .text("y")
        .attr("font-size", "35px")
        .attr("fill", "white");
    
    // for(let x = initialX, y = initialY; x <= endX - 100; x++, y--)
    // drawGraph();

    // const data = [
    //     { x: 10, y: 80 },
    //     { x: 50, y: 10 },
    //     { x: 90, y: 90 },
    //     { x: 130, y: 20 },
    //     { x: 170, y: 70 }
    // ];

    // const line = d3.line()
    //     .x(d => d.x)
    //     .y(d => d.y)
    //     .curve(d3.curveBasis);

    // svg.append("path")
    //     .attr("d", line(data))
    //     .attr("fill", "none")
    //     .attr("stroke", "white");
}

const drawGraph = () => {
    const data = [
        { x: initialX, y: initialY}
    ];

    const diffX = endX - initialX;
    for(let x = 0, y = 0; x < diffX; x++, y--)
    {
        if(x % 2 == 0)
        {
            data.push({ x: initialX + x * 100, y: initialY + f(y) * 100});
        }
        // svg.append("circle")
        //     .attr("cx", initialX + x)
        //     .attr("cy", initialY + f(y))
        //     .attr("r", 5)
        //     .attr("fill", "red");
        // console.log(`X: ${x} Y: ${f(y)}`);
    }

    console.log(data);

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasis);
    
    svg.append("path")
        .attr("d", line(data))
        .attr("fill", "none")
        .attr("stroke", "white");
}

const update = (timestamp) => {
    const now = Date.now();
    // const t = new Date(now - initialDate).getSeconds();
    const time = new Date(now - initialDate);
    const timeSeconds = time.getSeconds();
    const timeMiliseconds = time.getMilliseconds();
    // console.log(t);

    // svg.append("circle")
    //     .attr("cx", 200)
    //     .attr("cy", 600)
    //     .attr("r", 10)
    //     .attr("fill", "red");

    // window.requestAnimationFrame(update);
    // setTimeout(update, 0.01);
}

window.onload = () => {
    draw();
    update();
}

// window.requestAnimationFrame(update);