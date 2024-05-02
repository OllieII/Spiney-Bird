class Bird {
    constructor(x, y) {
        this.bodyImage = new Image();
        this.bodyImage.src = "./Asset/Bird.png";
        this.position = { x, y };
        this.path = [{x, y}, {x, y}, {x, y}, {x, y}];
        this.currentPoint = 0;
        this.t = 0;
        this.active = true;
        this.bodyImage.onload = () => {
            this.width = this.bodyImage.width;
            this.height = this.bodyImage.height;
        };

        this.lastFlap = 0;
        this.currentWing = 0;
        this.wings = [new Image(), new Image()];
        this.wings[0].src = "./Asset/Wing1.png";
        this.wings[1].src = "./Asset/Wing2.png";
        this.wingsImage = this.wings[this.currentWing];
    }

    setPath(newPoint) {
        this.path.push(newPoint);
        console.log(this.path.length);
        console.log(this.currentPoint);
        if (this.path.length > 4) {
            this.path.shift();//chatgpt provided this function which is basically removing the first element of the array and concat the point onto the end if it
            
        }
        this.currentPoint = 0;
        this.t = 0;
    }

    updatePosition() {
        if (!this.active) return;
        this.position.y += 1;  
        this.lastFlap += 1;
        if (this.lastFlap > 10) {
            this.lastFlap = 0; 
            this.currentWing = this.currentWing === 0 ? 1 : 0;
            this.wingsImage = this.wings[this.currentWing];
        }
        //this part is idea from chatgpt and i will comment it to demonstrate my understanding
        if (this.currentPoint <= this.path.length - 4) {// to ensure that there are enough points to calculate the spline
            let p = this.path.slice(this.currentPoint, this.currentPoint + 4);//get the 4 points needed to calculate the spline starting from the current point
            this.position = this.catmullRomSpline(p, this.t); //calculate the position of the bird using the spline
            this.t += 0.02;//increment the t value
            //if t is greater than or equal to 1, then reset t to 0 and increment the current point to start a new curve
            if (this.t >= 1) {
                this.t = 0;
                this.currentPoint++;
            }
        }
    }

    catmullRomSpline(p, t) {
        const [p0, p1, p2, p3] = p;
        const t2 = t * t;
        const t3 = t2 * t;
        return {
            x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 + (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3),
            y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 + (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3)
        };
    }

    draw(ctx) {
        if (!this.bodyImage.complete || !this.active) return;
        ctx.drawImage(this.bodyImage, this.position.x, this.position.y);
        ctx.drawImage(this.wingsImage, this.position.x, this.position.y);
    }
}
