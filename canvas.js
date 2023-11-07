let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

// c.fillStyle = 'green';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'orange';
// c.fillRect(200, 100, 100, 100);
// c.fillRect(300, 100, 100, 100);

// console.log(canvas)

// line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = 'blue'
// c.stroke();

// arc/circle


// for(let i = 0; i < 3; i++) {
//    let x = Math.random() * window.innerWidth;
//    let y = Math.random() * window.innerHeight;
//    c.beginPath();
//    c.strokeStyle = 'brown'
//    c.arc(x, y, 30, 0, Math.PI * 2, false)
//    c.stroke()
// }

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 40;
//let minRadius = 5;

let colorArray = [
    'green',
    'blue',
    'black',
    'purple',
]

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
      c.beginPath();
      c.strokeStyle = 'grray'
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
            this.radius += 1;
            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

// let x = Math.random() * window.innerWidth;
// let y = Math.random() * window.innerHeight;
// let dx = (Math.random() - 0.5) * 6;
// let dy = (Math.random() - 0.5) * 6;
// let radius = 30;

let circleArray = []

for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 3 +1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius))
}



function animate() {
    requestAnimationFrame(animate);
    c.clearRect( 0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate()