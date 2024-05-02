class Background {
    constructor( speed) {
        this.x = 0;
        this.speed = speed;
        this.image = new Image();
        this.image.src = "./Asset/Background.png";
        this.width = canvas.width;
        this.height = canvas.height;

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }
    // this idea is borrowed from the internet to creat the scrolling effect by connecting two images together as they move
    draw(ctx) {
        ctx.drawImage(this.image, this.x, 0, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }
}
