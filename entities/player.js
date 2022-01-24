class Player extends Entity
{
    constructor(game, x, y)
    {
        super(game, x, y);
        
        this.width = 6;
        this.height = 11;
        this.scale = 5;

        this.direction = 0;

        this.animator = new Animator(ASSET_MANAGER.getAsset("./riskPlayer.png"), 0, 0, 6, 11, 8, 0.2);

        // this.bitSpawner = new BitSpawner(game, x + this.width / 2 * this.scale, y + this.height * this.scale);
        // this.children.push(this.bitSpawner);
    }

    update()
    {
        super.update();
        if (this.game.keys != undefined)
        {
            if (this.game.keys["a"])
            {
                this.moveBy(-1, 0);
            }
            if (this.game.keys["d"])
            {
                this.moveBy(1, 0);
            }
        }
    }

    draw(ctx)
    {
        if (this.direction == 1)
        {
            ctx.scale(-1, 1);
        }

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale, this.direction);
    }
}