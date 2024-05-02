class Tube {
    constructor(x, y, baseLength) {
        this.image = new Image();
        this.image.src = "./Asset/Tube.png";
        this.x = x;
        this.y = y;
        this.baseLength = baseLength; 
        this.active = true;
        this.width = 50; 
        this.height = 100*baseLength;  

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height * this.baseLength;
        };
    }

    draw(ctx) {
        if (!this.image.complete || !this.active) return;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        if (!this.active) return;
        this.x -= 2; 
        if (this.x + this.width < 0) {
            this.active = false; 
        }
    }

    
}

