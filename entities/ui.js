class UIElement extends Entity
{
    constructor(game, x, y, clickable = false)
    {
        super(game, x, y);
    }

}

class TextElement extends UIElement
{
    constructor(game, x, y, text, fontFamily = "robotoCondensed", fontSize = 24, color = "#000", textAlign = "left")
    {
        super(game, x, y)

        this.text = text;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
        this.textAlign = textAlign;
    }

    draw(ctx)
    {
        ctx.save();

        ctx.font = (this.fontSize) + "px " + (this.fontFamily); 

        ctx.fillStyle = this.color;

        ctx.textAlign = this.textAlign;
        if (this.textAlign == "center")
        {
            ctx.textBaseline = "middle";
        }

        if (this.maxWidth == 0)
        {
            ctx.fillText(this.text, this.x, this.y);
        }
        else
        {
            ctx.fillText(this.text, this.x, this.y, this.maxWidth);   
        }
        ctx.restore();
    }
}

class Panel extends UIElement
{
    constructor(game, x, y, width, height, panelColor)
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.panelFront = new Rectangle(game, x, y, width, height - 6, rgb(178,182,157));
        this.panelBack = new Rectangle(game, x, y, width, height, "#898e6b");

        this.children.push(this.panelBack);
        this.children.push(this.panelFront);

        // this.children.push(new Rectangle(game, x, y, width, height, panelColor));
    }

}

class Button extends UIElement
{
    constructor(game, x, y, width, height, frontColor, backColor, textColor = "#fff", text = "")
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.clickable = true;
        this.hoverable = true;

        this.frontColor = frontColor;
        this.backColor = backColor;

        this.buttonBack = new RoundedRectangle(game, x, y, width, height, backColor);
        this.buttonFront = new RoundedRectangle(game, x, y, width, height - 6, frontColor);
        this.text = new TextElement(game, (x + width / 2), (y + height / 2), "Start", "robotoCondensed", height / 2, textColor, "center");

        this.children.push(this.buttonBack);
        this.children.push(this.buttonFront);
        this.children.push(this.text);
    }

    mouseClicked(mouseX, mouseY)
    {
        // console.log(mouseX + ", " + mouseY);
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            this.buttonFront.color = this.backColor;
        }
    }

    mouseUp(mouseX, mouseY)
    {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            this.buttonFront.color = this.frontColor;
        }
    }

    mouseHover(mouseX, mouseY)
    {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            document.documentElement.style.cursor = "pointer";
        }
        else
        {
            this.buttonFront.color = this.frontColor;
            document.documentElement.style.cursor = "";
        }
    }

}

class StatTracker extends UIElement
{
    constructor(game, x, y, width, height)
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.trackerBack = new RoundedRectangle(game, x, y, width, height, rgba(0, 0, 0, 0.5));
        this.text = new TextElement(game, (x + width / 2) + (height / 2), (y + height / 2), "100k", "robotoCondensed", height / 2, "#fff", "center");
        this.heartIcon = new ImageEntity(game, x, y, ASSET_MANAGER.getAsset("images/iconHeart.png"), height, height);

        this.children.push(this.trackerBack);
        this.children.push(this.text);
        this.children.push(this.heartIcon);

        this.tick = 0;
        this.currentNumber = 0;

    }

    update()
    {
        this.tick += 1;
        if (this.tick >= 10)
        {
            this.text.text = this.currentNumber += 1;
            this.tick = 0;
        }
    }

}

//TODO FIX
class ProgressBar extends UIElement
{
    constructor(game, x, y, width, height, color = "rgba(231, 76, 60,1.0)")
    {
        super(game, x, y, false);

        this.width = width;
        this.height = height;
        this.color = color;

        this.currentPercent = 0.5;

        this.progressBarBack = new Rectangle(game, x, y, this.width, this.height, "rgba(0, 0, 0, 0.5)");
        this.progressBarFront = new Rectangle(game, x, y, this.width * this.currentPercent, this.height, color);
        this.percentText = new TextElement(game, x, y, "50/100");

        this.children.push(this.progressBarBack);
        this.children.push(this.progressBarFront);
        this.children.push(this.percentText);
    }

    setPercent(percent)
    {
        if (percent < 0) this.currentPercent = 0.0
        else if (percent > 1) this.currentPercent = 1.0
        else this.currentPercent = percent;

        this.progressBarFront.width = this.width * this.currentPercent;
    }

    incrementPercent(percentToIncrement)
    {
        this.setPercent(this.currentPercent += percentToIncrement);
    }
}
