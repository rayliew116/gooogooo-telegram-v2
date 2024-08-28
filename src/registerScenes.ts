import SceneKeys from './shooter/consts/SceneKeys'

import TitleScreen from './shooter/scenes/TitleScreen'
import Bootstrap from './shooter/scenes/Bootstrap'
import Preload from './shooter/scenes/Preload'
import Game from './shooter/scenes/Game'
import GameUI from './shooter/scenes/GameUI'
import GameOver from './shooter/scenes/GameOver'

import TipsInterstitial from './shooter/scenes/TipsInterstitial'

const registerScenes = (game: Phaser.Game) => {
	const scene = game.scene
	scene.add(SceneKeys.Bootstrap, Bootstrap)
	scene.add(SceneKeys.Preload, Preload)
	scene.add(SceneKeys.TitleScreen, TitleScreen)
	scene.add(SceneKeys.Game, Game)
	scene.add(SceneKeys.GameUI, GameUI)
	scene.add(SceneKeys.GameOver, GameOver)
	scene.add(SceneKeys.TipsInterstitial, TipsInterstitial)
}

export default registerScenes
