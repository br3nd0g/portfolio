function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function animateName(){
    const letters = Array.from(document.getElementsByClassName('animatedName'));

    letters.forEach((letter, index) => {
        letter.style.animation = `floatUpDown 2s ease-in-out infinite`;
        letter.style.animationDelay = `${index * 0.1}s`;
    });
}

function makeGraphic(){

    const canvas = document.getElementById('netCanvas');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth;

    if(window.innerWidth <= 901){
        canvas.clientHeight = canvas.clientWidth - "200px";
        canvas.height = canvas.clientHeight;
        console.log("h");
    }

    const ctx = canvas.getContext("2d");

    const nodeColour = "#6b6a6a";
    const lineColour = "#5c5c5c";
    let repellentModifier = 0.5; 

    class netNode {
        constructor(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
        }
    }

    function setupNodes(numNodes){

        const nodesArray = [];

        for (let i = 0; i < numNodes; i++) {
            const x = clamp(Math.random() * canvas.width, 50, canvas.width - 50);
            const y = clamp(Math.random() * canvas.height, 50, canvas.height - 50);
            nodesArray.push(new netNode(i, x, y));
        }

        return nodesArray
    }

    function createConnections(nodesArray){
        const connectionsArray = [];

        nodesArray.forEach(node => {
            let connected = false;
            while (!connected) {
            const randomNode = nodesArray[Math.floor(Math.random() * nodesArray.length)];
            if (node.id !== randomNode.id && !connectionsArray.some(conn => 
            (conn[0] === node && conn[1] === randomNode) || (conn[0] === randomNode && conn[1] === node))) {
                connectionsArray.push([node, randomNode]);
                connected = true;
            }
            }
        });

        while (connectionsArray.length < 2 * nodesArray.length) {
            const node1 = nodesArray[Math.floor(Math.random() * nodesArray.length)];
            const node2 = nodesArray[Math.floor(Math.random() * nodesArray.length)];

            if (node1.id !== node2.id && !connectionsArray.some(conn => 
            (conn[0] === node1 && conn[1] === node2) || (conn[0] === node2 && conn[1] === node1))) {
            connectionsArray.push([node1, node2]);
            }
        }

        return connectionsArray;
    }

    function drawNodes(context, nodesArray){
        nodesArray.forEach(node => {
            context.beginPath();
            context.arc(node.x, node.y, 5, 0, Math.PI * 2);
            context.fillStyle = nodeColour;
            context.fill();
            context.closePath();
        });
    }

    function drawConnections(context, connectionsArray){
        connectionsArray.forEach(connection => {
            context.beginPath();
            context.moveTo(connection[0].x, connection[0].y);
            context.lineTo(connection[1].x, connection[1].y);
            context.strokeStyle = lineColour;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
        });
    }

    // function moveNodes(nodesArray){
    //     nodesArray.forEach(node => {
    //         node.x += (Math.random() - 0.5) * 2;
    //         node.y += (Math.random() - 0.5) * 2;
    //         node.x = clamp(node.x, 50, canvas.width - 50);
    //         node.y = clamp(node.y, 50, canvas.height - 50);
    //     });
    // }

    function interpolateValue(time, min, max, duration) {
        return min + (max - min) * (Math.sin((time / duration) * Math.PI * 2) + 1) / 2;
    }

    function moveNodes(nodesArray, canvasObj){

        function applyCentralForce(allNodes, canvasObjForDimensions) {
            const centerX = canvasObjForDimensions.width / 2;
            const centerY = canvasObjForDimensions.height / 2;

            allNodes.forEach(node => {
                const dx = centerX - node.x;
                const dy = centerY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = 1;
                node.x += (dx / distance) * force;
                node.y += (dy / distance) * force;
            });
        }

        function applyRepellentForce(allNodes){
            let repellentDistance = 100 + repellentModifier; // distance at which nodes repel each other
            const repellentStrength = 0.7; // strength of the repellent force

            if(window.innerWidth <= 650){
                repellentDistance = 70 + repellentModifier
            }

            // console.log(repellentModifier)

            for (let i = 0; i < allNodes.length; i++) {
                for (let j = i + 1; j < allNodes.length; j++) {
                    const dx = allNodes[j].x - allNodes[i].x;
                    const dy = allNodes[j].y - allNodes[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < repellentDistance) {
                        const force = repellentStrength * (repellentDistance - distance) / distance;
                        allNodes[i].x -= (dx / distance) * force;
                        allNodes[i].y -= (dy / distance) * force;
                        allNodes[j].x += (dx / distance) * force;
                        allNodes[j].y += (dy / distance) * force;
                    }
                }
            }
        }

        function pushFromCenter(allNodes, canvasObjForDimensions) {
            const centerX = canvasObjForDimensions.width / 2;
            const centerY = canvasObjForDimensions.height / 2;
            allNodes.forEach(node => {
                const dx = node.x - centerX;
                const dy = node.y - centerY;

                const centerAura = 20;

                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < centerAura) {
                    const repellingForce = 2; 
                    node.x += (dx / distance) * repellingForce;
                    node.y += (dy / distance) * repellingForce;
                }
            });
        }

        applyCentralForce(nodesArray, canvasObj);
        applyRepellentForce(nodesArray);
        // pushFromCenter(nodesArray, canvasObj);

    }

    function animationLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveNodes(nodes, canvas);
        drawConnections(ctx, connections);
        drawNodes(ctx, nodes);
        requestAnimationFrame(animationLoop);
    }

    const nodes = setupNodes(30);
    const connections = createConnections(nodes);

    drawConnections(ctx, connections);
    drawNodes(ctx, nodes);
    animationLoop();
    
    setInterval(() => {
        let low = -10;
        let high = 10;
        let duration = 5000;
    
        const currentTime = Date.now();
        repellentModifier = interpolateValue(currentTime, low, high, duration);
        
    }, 50); 
    

    window.addEventListener('resize', () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientWidth;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections(ctx, connections);
        drawNodes(ctx, nodes);
    });
}

animateName();

makeGraphic();