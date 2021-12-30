import {Vector2} from "../helpers/Vector2.js"

/*
This is an AABB
(I know it just says BoundingBox but that was just to make the name shorter, it is very axis-aligned)
*/

class BoundingBox{
    
    Position = new Vector2(0,0);
    Size = new Vector2(0,0);
    
    CollisionCallback = null;
    
    constructor(x, y, w, h){
        this.Position = new Vector2(x,y);
        this.Size = new Vector2(w, h);
    }
    
    IsColliding(otherBB){

        let pos = this.Position;
        let size = this.Size;
        let otherPos = otherBB.Position;
        let otherSize = otherBB.Size;

        //Left is clear of right
        if(pos.X > otherPos.X + otherSize.X){
            return false;
        }
        //Right is clear of left
        if(pos.X + size.X < otherPos.X){
            return false;
        }
        //Top is clear from bottom
        if(pos.Y > otherPos.Y + otherSize.Y){
            return false;
        }
        //Bottom is clear of top
        if(pos.Y + size.Y < otherPos.Y){
            return false;
        }

        //If none of above conditions are true the rectangles must be overlapping
        return true;
        
    }

    

    DebugDraw(context){

        context.fillStyle = 'rgb(0, 200, 0)';
        context.beginPath();
        context.ellipse(this.Position.X, this.Position.Y, 2, 2, 0, 0, 2 * Math.PI, false);
        context.fill();

        context.strokeStyle = 'rgb(1, 200, 1)';
        context.beginPath();
        context.rect(this.Position.X, this.Position.Y, this.Size.X, this.Size.Y);
        context.stroke();

    }

}

export {BoundingBox};