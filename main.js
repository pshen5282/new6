document.addEventListener("DOMContentLoaded", () =>{
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
let newDetector = Matter.Detector.create()
Composite.add(engine.world, [ground]);
let collisions = Matter.Detector.collisions(newDetector);
// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
function updateCollisions() {
    collisions = Matter.Detector.collisions(newDetector);
    window.requestAnimationFrame(updateCollisions)
    for (i in collisions) {
        console.log(collisions[i])
        if (collisions[i].bodyA.circleRadius == collisions[i].bodyB.circleRadius) {
            console.log(newDetector.bodies)
            console.log(engine.world.bodies)
            //let newCircle = Bodies.circle(400,200,collisions[i].bodyA.circleRadius * 2);
            console.log(collisions[i].bodyA)
            Composite.remove(engine.world,[collisions[i].bodyA])
            console.log(collisions[i].bodyB)
            Composite.remove(engine.world,[collisions[i].bodyB])
            newDetector.bodies.splice(newDetector.bodies.indexOf(collisions[i].bodyA,1))
            console.log("removing 1")
            console.log(newDetector.bodies)
            newDetector.bodies.splice(newDetector.bodies.indexOf(collisions[i].bodyB,1))
            console.log("removing 2")
            console.log(newDetector.bodies)
            //Composite.add(engine.world, [newCircle])
            //newDetector.bodies.push(newCircle)
        }
    }
}
window.requestAnimationFrame(updateCollisions)
document.getElementById("SpawnButton").addEventListener("click", () => {
    let newCircle = Bodies.circle(400,200,8);
    Composite.add(engine.world, [newCircle])
    newDetector.bodies.push(newCircle)
})
})