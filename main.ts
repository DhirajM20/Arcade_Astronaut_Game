function createAsteroids () {
    info.startCountdown(15)
    asteroidList = [assets.image`asteroid0`, assets.image`asteroid0`, assets.image`asteroid0`]
    while (info.countdown() > 0) {
        projectile = sprites.createProjectileFromSide(asteroidList._pickRandom(), randint(-75, -25), randint(-25, 25))
        projectile.setPosition(160, randint(5, 115))
        pause(randint(250, 1000))
    }
}
function startGame () {
    info.setLife(3)
    scene.setBackgroundImage(assets.image`spaceBackground`)
    discovery = sprites.create(assets.image`discoveryShuttle`, SpriteKind.Player)
    discovery.z = 10
    discovery.setPosition(30, 60)
    controller.moveSprite(discovery, 75, 75)
    discovery.setStayInScreen(true)
    createAsteroids()
}
info.onCountdownEnd(function () {
    hubble = sprites.create(assets.image`hubbleTelescope`, SpriteKind.Player)
    hubble.setPosition(140, 55)
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    game.showLongText("Congrats You Won", DialogLayout.Bottom)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    scene.setBackgroundImage(assets.image`kellyScreen`)
    game.showLongText("You successfully navigated", DialogLayout.Bottom)
    game.showLongText("Mission Accomplished", DialogLayout.Bottom)
    game.reset()
})
let hubble: Sprite = null
let discovery: Sprite = null
let projectile: Sprite = null
let asteroidList: Image[] = []
scene.setBackgroundImage(assets.image`kellyScreen`)
game.showLongText("My name is Astronaut Dhiraj,", DialogLayout.Bottom)
game.showLongText("and I need your help investigating the space shuttle", DialogLayout.Bottom)
game.showLongText("Use the arrow keys to move the discovery space shuttle", DialogLayout.Bottom)
game.showLongText("Aviod the asteroids for 15 seconds to win", DialogLayout.Bottom)
startGame()
