// MovableObject - Base class for objects that can move

class MovableObject extends DrawableObject
{
    //inherited xCoordinate , yCoordinate , width , height
    OBJECT_SPEED;
    yVelocity = 0;
    isJumping = false;


    constructor(width, height, speed)
    {
        super(0, 0, width, height);
        this.OBJECT_SPEED = speed;
    }



    moveLeft()
    {
        this.xCoordinate -= this.OBJECT_SPEED;
    }


    moveRight()
    {
        this.xCoordinate += this.OBJECT_SPEED;
    }


    jump()
    {
        if (!this.isJumping) {
            this.yVelocity = -CHARACTER_JUMP_FORCE;
            this.isJumping = true;
        }
    }

    applyGravity()
    {
        this.yVelocity += GRAVITY;
        this.yCoordinate += this.yVelocity;

        // Stop at ground level
        if (this.yCoordinate >= GROUND_LEVEL) {
            this.yCoordinate = GROUND_LEVEL;
            this.yVelocity = 0;
            this.isJumping = false;
        }
    }
}
