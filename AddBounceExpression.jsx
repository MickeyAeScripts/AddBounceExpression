// AddBounceExpression.jsx
// Applies an inertial-bounce (overshoot) expression to every selected property.
// The expression is the classic inertial bounce by Dan Ebberts (motionscript.com).
{
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("No active composition.");
    } else {
        var bounceExpr = [
            "n = 0;",
            "if (numKeys > 0){",
            "n = nearestKey(time).index;",
            "if (key(n).time > time){",
            "n--;",
            "}",
            "}",
            "if (n == 0){",
            "t = 0;",
            "}else{",
            "t = time - key(n).time;",
            "}",
            "",
            "if (n > 0 && t < 1){",
            "v = velocityAtTime(key(n).time - thisComp.frameDuration/10);",
            "amp = .03;",
            "freq = 1.0;",
            "decay = 8.0;",
            "value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);",
            "}else{",
            "value;",
            "}"
        ].join("\n");

        app.beginUndoGroup("Add Bounce Expression");

        var count = 0;
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            var selected = layer.selectedProperties;
            for (var j = 0; j < selected.length; j++) {
                var prop = selected[j];
                if (prop.canSetExpression) {
                    prop.expression = bounceExpr;
                    count++;
                }
            }
        }

        app.endUndoGroup();

        if (count === 0) {
            alert("No properties selected.\nSelect one or more properties in the timeline first.");
        }
    }
}
