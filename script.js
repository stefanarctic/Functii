

const initialDate = Date.now();

let mouseX = 0, mouseY = 0;

document.onmousemove = (e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let func = "x";

const evalFunc = () => {
    f = x => {
        const funcText = func.replace('x', x)
        .replace('arc', '1 / ')
        .replace('sin', 'Math.sin')
        .replace('cos', 'Math.cos')
        .replace('tan', 'Math.tan')
        .replace('ctg', '1 / Math.tan')
        .replace('tg', 'Math.tan')
        // .replace('arcsin', 'Math.asin')
        // .replace('asin', 'Math.asin')
        // .replace('arccos', 'Math.acos')
        // .replace('acos', 'Math.acos')
        // .replace('arctan', 'Math.atan')
        // .replace('atan', 'Math.atan')
        // .replace('arctg', 'Math.atan')
        // .replace('atg', 'Math.atan')

        const result = eval(funcText);
        return result;
    }
}

let f = x => {}

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
        if(this.svg)
            this.svg.remove();
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
    },
    // redraw: () => {
    //     graph.clear();
    //     graph.init();
    //     graph.renderBody();
    //     graph.drawLines();
    //     graph.drawGraph();
    //     console.log('Size: ', lineSize);
    // },
    // setLineSize: newLineSize => {
    //     thislineSize = newLineSize;
    // },
    // zoomIn: () => {
    //     console.log('zoomed in', lineSize);
    //     graph.setLineSize(5);
    //     graph.redraw();
    // },
    // zoomOut: () => {
    //     console.log('zoomed out', lineSize);
    //     lineSize -= 1.5;
    //     graph.redraw();
    // },
}

const update = (timestamp) => {
    const now = Date.now();
    const time = new Date(now - initialDate);
    const timeSeconds = time.getSeconds();
    const timeMiliseconds = time.getMilliseconds();
}

window.onload = () => {
    evalFunc();
    graph.init();
    graph.clear();
    graph.renderBody();
    graph.drawLines();
    graph.drawGraph();

    insertFunctionPopup.init();
}

window.onresize = () => {
    graph.clear();
    graph.init();
    graph.renderBody();
    graph.drawLines();
    graph.drawGraph();
}

const insertFunctionPopup = {
    showing: false,
    htmlElement: document.getElementById('insert-function-div'),
    inputElement: document.getElementById('insert-function-input'),
    isShowing: () => {
        return this.showing;
    },
    init: () => {
        showing = false;
        htmlElement = document.getElementById('insert-function-div');
        inputElement = document.getElementById('insert-function-input');
    },
    open: () => {
        console.log('opened window')
        showing = true;
        htmlElement.style.display = 'flex';
        inputElement.focus();
    },
    close: () => {
        showing = false;
        htmlElement.style.display = 'none';
        inputElement.value = '';
    },
    getText: () => {
        return inputElement.value;
    }
};

const keys = {};

window.onkeydown = e => {
    if(e.key === 'f')
    {
        insertFunctionPopup.open();
        e.preventDefault();
    }
    else if(e.key === 'Enter')
    {
        if(insertFunctionPopup.isShowing())
        {
            if(insertFunctionPopup.inputElement.value === '')
                return;
            // evaluateFunction(insertFunctionPopup.getText());
            const text = insertFunctionPopup.getText();
            func = text;
            evalFunc();

            graph.clear();
            graph.init();
            graph.renderBody();
            graph.drawLines();
            graph.drawGraph();

            // console.log(func);
            insertFunctionPopup.close();
        }
    }
    else if(e.key === 'Escape')
    {
        if(insertFunctionPopup.isShowing())
            insertFunctionPopup.close();
    }
    // else
    // {
    //     keys[e.key] = true;
    // }

    // if(keys['Control'])
    // {
    //     if(keys['='])
    //     {
    //         e.preventDefault();
    //         graph.zoomIn();
    //     }
    //     if(keys['-'])
    //     {
    //         e.preventDefault();
    //         graph.zoomOut();
    //     }
    // }
}

window.onkeyup = e => {
    keys[e.key] = false;
}

window.onclick = e => {

}