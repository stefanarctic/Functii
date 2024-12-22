

const initialDate = Date.now();

let mouseX = 0, mouseY = 0;

document.onmousemove = (e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let func = "sin(x)";

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
        return result * amp;
    }
}

let f = x => { }

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
        this.amp = 1;
        this.lineThickness = 5;
        this.graphThickness = 3;
        this.svgScale = 1;
        this.data = [];
    },
    clear: () => {
        if (this.svg)
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

        // this.svg.node().style.scale = svgScale;

        this.currentTransform = d3.zoomIdentity;

        const zoomed = e => {
            this.currentTransform = e.transform;

            redrawGraph();
        }

        // Set up zoom
        this.zoom = d3.zoom()
            // .scaleExtent([0.5, 10])
            .on("zoom", zoomed);

        this.svg.call(this.zoom);

        // svg.select(".x-axis")
        //     .attr("class", "x-axis");

        // svg.select(".y-axis")
        //     .attr("class", "y-axis");
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
            .attr("stroke-width", lineThickness)
            .attr("class", "x-axis");

        // Draw Y axis
        svg.append("line")
            .attr("x1", centerX)
            .attr("y1", centerY + lineSize / 2)
            .attr("x2", centerX)
            .attr("y2", centerY - lineSize / 2)
            .attr("stroke", "white")
            .attr("stroke-width", lineThickness)
            .attr("class", "y-axis");

        // Draw center circle
        svg.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", 8)
            .attr("fill", "white");

        // Draw O text
        svg.append("text")
            .attr("x", centerX - 40)
            .attr("y", centerY + 40)
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
        data = [];
        const beginX = centerX - lineSize / 2;
        const beginY = centerY + lineSize / 2;
        const endX = centerX + lineSize / 2;
        const endY = centerY - lineSize / 2;

        let yCoord = beginY;
        for (let xCoord = beginX; xCoord <= endX; xCoord++, yCoord--) {
            let a = -(yCoord - centerY);
            let yPos = centerY - f(a);

            const transformedPoint = currentTransform.apply([xCoord, yPos]);

            // if(xCoord % (graph.getAmp() / 2) === 0)
            // data.push(
            //     { x: xCoord, y: yPos }
            // );

            data.push(
                { x: transformedPoint[0], y: transformedPoint[1] }
            );
        }

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasis);

        svg.append("path")
            .attr("d", line(data))
            .attr("fill", "none")
            .attr("stroke-width", graphThickness)
            .attr("stroke", "red");
    },
    getLineSize: () => {
        return lineSize;
    },
    setLineSize: newLineSize => {
        lineSize = newLineSize;
    },
    getAmp: () => {
        return amp;
    },
    setAmp: newAmp => {
        amp = newAmp;
    },
    getSVG: () => {
        return svg;
    },
    getSVGScale: () => {
        return svgScale;
    },
    setSVGScale: newSVGScale => {
        svgScale = newSVGScale;
    },
    updateSVGScale: () => {
        svg.node().style.scale = svgScale;
    },
    getLineThickness: () => {
        return lineThickness;
    },
    setLineThickness: newLineThickness => {
        lineThickness = newLineThickness;
    },
    getGraphThickness: () => {
        return graphThickness;
    },
    setGraphThickness: newGraphThickness => {
        graphThickness = newGraphThickness;
    },
    getZoom: () => {
        return zoom;
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

const zoomIn = () => {
    console.log('zoomed in');
    // const oldAmp = graph.getAmp() * 1;
    // const oldLineSize = graph.getLineSize();
    // graph.init();
    // graph.setAmp(oldAmp + 50);
    // graph.setLineSize(oldLineSize * 2);
    // console.log(graph.getAmp());
    // graph.clear();
    // graph.renderBody();
    // graph.drawLines();
    // graph.drawGraph();
    // graph.getSVG().style.scale = '200';
    // console.log(graph.getSVG());
    // if(svg.style.scale === '')
    // {
    //     // svg.style.scale = 1;
    //     graph.setSVGScale(1);
    //     graph.updateSVGScale();
    // }

    // svg.style.scale = new Number(svg.style.scale) + 0.5;

    graph.getZoom().scaleBy(graph.getSVG(), 2);
    // const svg = graph.getSVG();
    // svg.select("path")
    //     .attr("transform", "translate(0, 0) scale(2)");

    /*

    const svg = graph.getSVG().node();

    graph.setSVGScale(new Number(graph.getSVGScale()) + 0.5);
    graph.updateSVGScale();
    console.log(graph.getSVGScale());

    graph.setLineThickness(graph.getLineThickness() - 0.5);
    graph.setAmp(graph.getAmp() + 2);
    console.log(graph.getLineSize())
    graph.setLineSize(graph.getLineSize() + 200);
    console.log(graph.getLineSize())


    redrawGraph();
    console.log(graph.getLineSize())

    */
    // Use d3 zoom (see Gemini)

}

const zoomOut = () => {
    console.log('zoomed out')
    // const oldAmp = graph.getAmp() * 1;
    // const oldLineSize = graph.getLineSize();
    // graph.init();
    // graph.setAmp(oldAmp + 50);
    // graph.setLineSize(oldLineSize / 2);
    // console.log(graph.getAmp());
    // graph.clear();
    // graph.renderBody();
    // graph.drawLines();
    // graph.drawGraph();

    graph.getZoom().scaleBy(graph.getSVG(), 0);

    /*
    const svg = graph.getSVG().node();

    graph.setSVGScale(new Number(graph.getSVGScale()) - 0.5);
    graph.updateSVGScale();

    console.log(graph.getSVGScale());
    
    redrawGraph();
    */
}

const update = (timestamp) => {
    const now = Date.now();
    const time = new Date(now - initialDate);
    const timeSeconds = time.getSeconds();
    const timeMiliseconds = time.getMilliseconds();
}

const redrawGraph = () => {
    graph.clear();
    graph.renderBody();
    graph.drawLines();
    graph.drawGraph();
}

const redrawGraphAndInit = () => {
    graph.clear();
    graph.init();
    graph.renderBody();
    graph.drawLines();
    graph.drawGraph();
}

window.onload = () => {
    evalFunc();
    graph.init();
    redrawGraph();

    insertFunctionPopup.init();
}

window.onresize = () => {
    redrawGraphAndInit();
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
    if (e.key === 'f') {
        insertFunctionPopup.open();
        e.preventDefault();
    }
    else if (e.key === 'Enter') {
        if (insertFunctionPopup.isShowing()) {
            if (insertFunctionPopup.inputElement.value === '')
                return;
            // evaluateFunction(insertFunctionPopup.getText());
            const text = insertFunctionPopup.getText();
            func = text;
            evalFunc();

            redrawGraphAndInit();

            // console.log(func);
            insertFunctionPopup.close();
        }
    }
    else if (e.key === 'Escape') {
        if (insertFunctionPopup.isShowing())
            insertFunctionPopup.close();
    }
    else {
        keys[e.key] = true;
    }

    if (keys['Control']) {
        if (keys['=']) {
            e.preventDefault();
            zoomIn();
        }
        if (keys['-']) {
            e.preventDefault();
            zoomOut();
        }
    }
}

window.onkeyup = e => {
    keys[e.key] = false;
}

window.onclick = e => {

}