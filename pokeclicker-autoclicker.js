javascript: (() => {
    let elTitle = document.getElementById('gameTitle');
    let elDivButton = document.createElement('div');
    let elStyle = document.createElement('style');
    elStyle.innerText = `
    .my-loop-button {
        border: 1px solid rgb(51, 51, 51);
        color: #fff;
        height: 3rem;
        width: 3rem;
        display: inline-block;
        margin-left: 20px;
        font-size: 1.5rem;
        text-align: center;
        align-self: center;
        border-radius: 4px;
        line-height: 2.7rem;
        background-color: hsla(0, 50%, 0%, 1);
    }
    .my-loop-button.off {
        background-color: hsla(0, 50%, 0%, 1) !important;
    }
    `;
    document.head.append(elStyle);
    elDivButton.append('OFF');
    elDivButton.classList.add('my-loop-button', 'off');
    elTitle.after(elDivButton);

    elDivButton.degree = 0;
    elDivButton.nextDegree = function () {
        elDivButton.degree += 360 / 32;
        elDivButton.degree = (elDivButton.degree >= 360) ? 0 : elDivButton.degree;
        elDivButton.style.backgroundColor = 'hsl(' + elDivButton.degree + ', 50%, 50%, .7)';
    };
    elDivButton.addEventListener('click', () => {
        window.loopdungeonlist = [GameConstants.DungeonTile.boss, GameConstants.DungeonTile.enemy/*, empty, entrance, chest*/];
        window.looptimer = 500;
        

        if (window.clickloop === undefined) {
            let _click;
            elDivButton.textContent = 'ON';
            elDivButton.classList.replace('off', 'on');
            window.clickloop = true;

            window.setTimeout(function cloop () {
                _click = () => {};
                window.looptimer = 500;

                if (App.game.gameState === GameConstants.GameState.fighting && Battle.enemyPokemon() !== null && Battle.enemyPokemon().isAlive()) {
                    _click = () => Battle.clickAttack();
                    window.looptimer = 51;
                }
                
                if (App.game.gameState === GameConstants.GameState.dungeon && window.loopdungeonlist.includes(DungeonRunner.map.currentTile().type())) {
                    _click = () => DungeonRunner.handleClick();
                    window.looptimer = 51;
                }
                
                _click();
                elDivButton.nextDegree();

                if (window.clickloop) {
                    window.setTimeout(cloop, window.looptimer)
                }
            }, window.looptimer);
        } else {
            elDivButton.classList.replace('on', 'off');
            elDivButton.textContent = 'OFF';
            delete window.clickloop;
        }
        console.log("Loop: ", window.clickloop !== undefined)
    });
})();