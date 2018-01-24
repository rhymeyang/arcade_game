
const MaxRows = 6;
const MaxCols = 5;

const ImgHeight = 83;
const ImgWidth = 101;

/**
* @description base class for Enemy & Player
* @constructor
* @param {string} sprite - 对象图片相对路径
* @param {float} x - 对象初始位置
* @param {float} y - 对象初始位置
*/
class baseClass{
    constructor(sprite, x, y) {
        // 对象图片
        this.sprite = sprite;
        // 对象初始位置
        this.x = x;
        this.y = y;
    }

    render(ctx) {
        // 此为游戏必须的函数，用来在屏幕上画出对象
        ctx.drawImage(Resources.get(this.sprite), this.x * ImgWidth, this.y * ImgHeight - 20);
    }

}

/**
* @description 玩家要躲避的敌人
* @constructor
*/
class Enemy extends baseClass{
    constructor() {        
        super('images/enemy-bug.png',
            Math.floor(Math.random() * MaxCols), // 范围0-4
            Math.floor(Math.random() * 3) + 1);   // 范围 1-3,和Player使用同一坐标系，方便处理
        
        // 范围 1-2
        this.speedRate =Math.random()*2 +1;
    }

    reset() {
        this.x = -1;
        this.y = Math.floor(Math.random() * 3) + 1;
        this.speedRate =Math.random()*2 +1;
    }
    update(dt) {
        // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
        // 都是以同样的速度运行的
        this.x += dt * this.speedRate;
        if (this.x > MaxCols){
            this.reset();
        }
    }

}


/**
* @description 玩家类
* @constructor
*/
class Player extends baseClass{
    constructor() {
        super('images/char-boy.png',
            Math.floor(MaxCols/2), 
            MaxRows -1);        
    }
    update() {
        if (this.y === 0){
            this.reset();
            document.getElementById("win-pop").hidden=false;
        }
        
    }
    reset(){
        this.x = 2;
        this.y = 5;
    }
    
    handleInput(direction){
        switch(direction){
            case 'left':
                this.x  = this.x <=0? 0: this.x -1;            
                break
            case 'up':
                this.y = this.y <=0 ? 0: this.y -1;
                break
            case 'right':
                this.x = this.x >=4 ? 4 : this.x +1;
                break
            case 'down':
                this.y = this.y >=5 ? 5: this.y +1;
                break
        }
    }
}


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [new Enemy(), new Enemy(), new Enemy()];

let player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

