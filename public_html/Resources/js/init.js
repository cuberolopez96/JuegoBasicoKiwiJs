/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
{
    let myGame = new Kiwi.Game("content");
    let myState = new Kiwi.State("myState");
    myState.preload = function(){
        Kiwi.State.prototype.preload.call(this);
        this.addSpriteSheet('characterSprite','Resources/images/character.png',150,117);
        this.addImage('background','Resources/images/jungle.png');
    }
    myState.create= function(){
        Kiwi.State.prototype.create.call(this);
        this.background = new Kiwi.GameObjects.StaticImage(this,this.textures.background,0,0);
        this.character = new Kiwi.GameObjects.Sprite(this,this.textures.characterSprite,350,330);
        this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
        this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
        this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);

        this.character.animation.add("idleright",[0],0.1,false);
        this.character.animation.add("crouchright",[1],0.1,false);
        this.character.animation.add("moveright",[2,3,4,6,7],0.1,true);
        this.character.animation.add("idleleft",[8],0.1,false);
        this.character.animation.add("crouchleft",[9],0.1,false);
        this.character.animation.add("moveleft",[15,14,13,12,11,10],0.1,true);
        this.facing = "right";
        
        this.character.animation.play("idleright");
        this.addChild(this.background);
        this.addChild(this.character);
        
    }
    myState.update= function(){
        Kiwi.State.prototype.update.call(this);
        
        if(this.downKey.isDown){
            if(this.character.animation.currentAnimation.name != ("crouch"+ this.facing)){
                this.character.animation.play("crouch"+this.facing);
            }
            
        }else if(this.leftKey.isDown){
            this.facing = "left";
            if(this.character.transform.x>3){
                this.character.transform.x-=3;
            }
            if(this.character.animation.currentAnimation.name !="moveleft"){
                this.character.animation.play("moveleft");
            }
        }
        else if(this.rightKey.isDown){
            this.facing = "right";
            if(this.character.transform.x<600){
                this.character.transform.x+=3;
            }
            if(this.character.animation.currentAnimation.name != "moveright"){
                this.character.animation.play("moveright");
            }
        }
        else{
            if(this.character.animation.currentAnimation.name!="idle"+this.facing){
                this.character.animation.play("idle"+this.facing);
            }
        }
    }
    myGame.states.addState(myState);
    myGame.states.switchState("myState");
}

