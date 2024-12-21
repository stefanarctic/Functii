

const initialDate = Date.now();

let mouseX = 0, mouseY = 0;

document.onmousemove = (e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})


const f = x => {
    return x;
}

// const centerX = document.body.clientWidth / 8;
// const centerY = document.body.clientHeight / 1.1;
// const endX = centerX + 650;
// const endY = centerY - 650;

const graph = {
    size: 0,
    posX: 0,
    posY: 0,
    centerX: 0,
    centerY: 0,
    endX: 0,
    endY: 0,
    svg: null,
    data: [],
    init: () => {
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.body.clientHeight;
        this.size = Math.max(screenWidth, screenHeight);
        this.centerX = screenWidth / 2;
        this.centerY = screenHeight / 2;
        this.endX = this.centerX + this.size;
        this.endY = this.centerY - this.size;
        // this.lineSize = screenWidth - 80;
        // this.lineSize = screenHeight - 80;
        this.lineSize = Math.min(screenWidth - 80, screenHeight - 80);
        this.data = [];
    },
    clear: () => {
        svg.remove();
    },
    getCenterX: () => {
        return this.centerX;
    },
    getCenterY: () => {
        return this.centerY;
    },
    renderBody: () => {
        this.svg = d3.select("body")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("background-color", "black");
    },
    drawLines: () => {
        // Draw background
        // svg.append("rect")
        //     .attr("x", centerX - lineSize / 2)
        //     .attr("y", centerY - lineSize / 2)
        //     .attr("width", lineSize)
        //     .attr("height", lineSize)
        //     .attr("stroke", "black")
        //     .attr("fill", "red");

        // Draw X axis
        svg.append("line")
            .attr("x1", centerX - lineSize / 2)
            .attr("y1", centerY)
            .attr("x2", centerX + lineSize / 2)
            .attr("y2", centerY)
            .attr("stroke", "white")
            .attr("stroke-width", 5);

        // Draw Y axis
        svg.append("line")
            .attr("x1", centerX)
            .attr("y1", centerY + lineSize / 2)
            .attr("x2", centerX)
            .attr("y2", centerY - lineSize / 2)
            .attr("stroke", "white")
            .attr("stroke-width", 5);

        // Draw center circle
        svg.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", 8)
            .attr("fill", "white");

        // Draw O text
        svg.append("text")
            .attr("x", centerX - 40)
            .attr("y", centerY + 40 )
            .text("O")
            .attr("font-size", "35px")
            .attr("fill", "white");
        
        // Draw X axis arrow
        svg.append("text")
            .attr("x", centerX + lineSize / 2 - 20)
            .attr("y", centerY + 13)
            .text(">")
            .attr("font-size", "40px")
            .attr("font-weight", "1200")
            .attr("fill", "white");
        
        // Draw Y axis arrow
        svg.append("text")
            .attr("transform", `rotate(-90 ${centerX} ${centerY - lineSize / 2})`)
            .attr("x", centerX - 5)
            .attr("y", centerY - lineSize / 2 + 13)
            .text(">")
            .attr("text-anchor", "middle")
            .attr("font-size", "40px")
            .attr("font-weight", "1200")
            .attr("fill", "white");
    
        // Draw X axis text
        svg.append("text")
            .attr("x", centerX + lineSize / 2 - 20)
            .attr("y", centerY + 40)
            .text("x")
            .attr("font-size", "35px")
            .attr("fill", "white");
        
        // Draw Y axis text
        svg.append("text")
            .attr("x", centerX - 30)
            .attr("y", centerY - lineSize / 2 + 40)
            .text("y")
            .attr("font-size", "35px")
            .attr("fill", "white");
    },
    drawGraph: () => {
        const beginX = centerX - lineSize / 2;
        const beginY = centerY + lineSize / 2;
        const endX = centerX + lineSize / 2;
        const endY = centerY - lineSize / 2;

        let yCoord = beginY;
        for(let xCoord = beginX; xCoord <= endX; xCoord++, yCoord--)
        {
            // let x = beginY - centerY;
            // let yCoord = centerY + f(x);
            // let a = yCoord - centerY;
            // console.log(x);
            let a = -(yCoord - centerY);
            let yPos = centerY - f(a);

            // For debugging
            // if(Math.floor(xCoord) % 100 === 0)
            // {
            //     svg.append("text")
            //         .attr("x", xCoord + 20)
            //         .attr("y", yPos)
            //         .text(a)
            //         .attr("font-size", "35px")
            //         .attr("fill", "white");

            //     svg.append("circle")
            //         .attr("cx", xCoord)
            //         .attr("cy", yPos)
            //         .attr("r", 8)
            //         .attr("fill", "white");
            // }

            data.push(
                { x: xCoord, y: yPos }
            );
        }

        // console.log(`BeginX: ${beginX} BeginY ${beginY}`);
        // console.log(`EndX: ${endX} EndY: ${endY}`);
        // console.log(xCoord);
        // console.log(`Data: `, data);

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasis);
        
        svg.append("path")
            .attr("d", line(data))
            .attr("fill", "none")
            .attr("stroke-width", "3px")
            .attr("stroke", "red");

        // const diffX = size;
        // for(let x = 0, y = 0; x < diffX; x++, y--)
        // {
        //     if(x % 2 == 0)
        //     {
        //         this.data.push({ x: centerX + x * 100, y: centerY + f(y) * 100});
        //     }
        // }
    
        // console.log(this.data);
    
        // const line = d3.line()
        //     .x(d => d.x)
        //     .y(d => d.y)
        //     .curve(d3.curveBasis);
        
        // svg.append("path")
        //     .attr("d", line(this.data))
        //     .attr("fill", "none")
        //     .attr("stroke", "white");
    }
}

const update = (timestamp) => {
    const now = Date.now();
    const time = new Date(now - initialDate);
    const timeSeconds = time.getSeconds();
    const timeMiliseconds = time.getMilliseconds();
}

window.onload = () => {
    graph.init();
    graph.renderBody();
    graph.drawLines();
    graph.drawGraph();
}

window.onresize = () => {
    graph.clear();
    graph.init();
    graph.renderBody();
    graph.drawLines();
    graph.drawGraph();
}