var LeaderLine;
//keep the col A id as key and its matching col B id as value
var matchingElements = {
    "colA-kite": "colB-letterK",
    "colA-lion": "colB-letterL",
    "colA-ink": "colB-letterI",
    "colA-jug": "colB-letterJ"
};
var clicks = [];
var matchedItemIds = [];
var lines = [];
//handle button clicks
function itemClicked(element) {
    console.log("clicked " + element.id);
    //if items already matched, dont process
    if (matchedItemIds.indexOf(element.id) > -1) {
        console.log("item already matched");
        return;
    }
    //first click
    if (clicks.length < 1) {
        clicks.push(element);
        //highlight selected element
        highlightElement(element);
    }
    else {
        //if an item is already clicked 
        //second item clicked in same column --> replace the previously selected one
        if ((clicks[0].id.startsWith("colA") && element.id.startsWith("colA")) ||
            (clicks[0].id.startsWith("colB") && element.id.startsWith("colB"))) {
            clicks[0] = element;
            deHighlightElement(clicks[0]);
            highlightElement(element);
        }
        else {
            ////second item clicked in opposite column 
            var key = element.id;
            var val = clicks[0].id;
            if (clicks[0].id.startsWith("colA")) {
                key = clicks[0].id;
                val = element.id;
            }
            //if correct match
            if (matchingElements[key] === val) {
                console.log("Draw line from " + key + " to " + val);
                var line = new LeaderLine(document.getElementById(key), document.getElementById(val), {
                    color: '#00ff00',
                    startPlug: 'behind',
                    endPlug: 'arrow3',
                    //startPlugColor: '#43bc5b',
                    //endPlugColor: '#1085e0',
                    //startPlugSize: 1.5,
                    //endPlugSize: 1.5,
                    //dash: true,
                    //endLabel: LeaderLine.pathLabel('This is a match'),
                    size: 4,
                    path: 'straight',
                    startSocket: 'auto',
                    endSocket: 'auto',
                    showEffectName: 'draw'
                });
                matchedItemIds.push(key, val);
                lines.push(line);
                highlightElement(element);
            }
            else {
                //incorrect match
                console.log("Draw temporary line from " + key + " to " + val);
                var line_1 = new LeaderLine(document.getElementById(key), document.getElementById(val), {
                    color: '#ff0000',
                    startPlug: 'behind',
                    endPlug: 'arrow3',
                    //startPlugColor: '#43bc5b',
                    //endPlugColor: '#1085e0',
                    //startPlugSize: 1.5,
                    //endPlugSize: 1.5,
                    dash: true,
                    middleLabel: LeaderLine.pathLabel('Incorrect!'),
                    size: 4,
                    path: 'straight',
                    startSocket: 'auto',
                    endSocket: 'auto'
                });
                highlightElement(element);
                //hide after a small pause
                var leftItem_1 = clicks[0];
                var rightItem_1 = element;
                setTimeout(function () {
                    line_1.remove();
                    deHighlightElement(leftItem_1);
                    deHighlightElement(rightItem_1);
                }, 1700);
            }
            //clear out clicks array
            clicks = [];
        }
    }
}
function highlightElement(element) {
    element.style["background"] = "rgb(100 100 200 / 65%)";
}
function deHighlightElement(element) {
    element.style["background"] = "rgb(0 0 0 / 65%)";
}
function reset() {
    matchedItemIds.forEach(function (matchedItemId) {
        deHighlightElement(document.getElementById(matchedItemId));
    });
    matchedItemIds = [];
    clicks.forEach(function (clickedItem) {
        deHighlightElement(clickedItem);
    });
    clicks = [];
    lines.forEach(function (line) {
        line.remove();
    });
    lines = [];
}
