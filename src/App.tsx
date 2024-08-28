import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, useLocation } from 'react-router-dom';

// Import images
import StartGame from './assets/img/start-now.png';
import MainLogo from './assets/img/logo.png';
import GoooGooo from './assets/img/gg-main.png';
import GoooGoooGif from './assets/img/gg-resized.gif';
import NavHome from './assets/img/nav-home.png';
import NavGG from './assets/img/nav-gooogooo.png';
import NavEarn from './assets/img/nav-earn.png';
import NavFriends from './assets/img/nav-friends.png';
import NavAirdrop from './assets/img/nav-airdrop.png';
import PointsBar from './assets/img/points-bar.png';
import LanguageIcon from './assets/img/language-icon.png';
import MusicIcon from './assets/img/music-icon.png';
import ExpBar from './assets/img/expbar-empty.png';
import ExpBarProgress from './assets/img/expbar-progress.png';
import ExpBarIcon from './assets/img/expbar-icon.png';
import BGMusic from './assets/sound/gooogoooplanet-low.mp3';

// Import pages here
import GooGooPage from './pages/GooGooPage/GooGoo';
import ReferralPage from './pages/ReferralPage/Referral';
import EarnPage from './pages/EarnPage/Earn';
import FriendsPage from './pages/FriendsPage/Friends';
import AirdropPage from './pages/AirdropPage/Airdrop';


import 'regenerator-runtime'
import Phaser from 'phaser'
import SceneKeys from './shooter/consts/SceneKeys'
import registerScenes from './registerScenes'
import config from './config'

// const game = new Phaser.Game(config)

// registerScenes(game)

// game.scene.start(SceneKeys.Bootstrap)

const App: React.FC = () => {

  const location = useLocation();
  const [startGame, setStartGame] = useState(false);
  const [points, setPoints] = useState(0);

  const bgm = useRef<HTMLAudioElement | null>(null);
  const [bgmIsPlaying, setBgmIsPlaying]= useState(false);

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bgm.current = new Audio(BGMusic);
    bgm.current.loop = true;
  },);

  useEffect(() => {
    if (gameContainerRef.current) {
      // Create the Phaser game instance
      const game = new Phaser.Game({
        ...config,
        parent: gameContainerRef.current, // Attach Phaser to the div via ref
      });

      // Register scenes
      registerScenes(game);

      // Start the initial scene
      game.scene.start(SceneKeys.Bootstrap);

      // Clean up the game instance on component unmount
      return () => {
        game.destroy(true);
      };
    }
  }, []);

  
  useEffect(() => {

    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  return (
    <div className="container game-container">
      <div className="row">
        <div className="col-12 px-0">
          <div className="game-bg">
            <div className="row header-section">
              <div className="col-3"></div>
              <div className="col-6 text-center">
                <img className="header-logo" src={MainLogo} />
              </div>
              <div className="col-3 header-icons-box">
                <button disabled className="btn p-0"><img className="header-icons" src={LanguageIcon}/></button>
                <button className="btn p-0" onClick={(e) => {
                  if (bgm.current && !bgmIsPlaying) {
                    bgm.current.pause();
                    setBgmIsPlaying(false);
                  } else if (bgm.current && bgmIsPlaying) {
                    bgm.current.play();
                    setBgmIsPlaying(true);
                  }
                }}>
                  <img className="header-icons" src={MusicIcon}/>

                </button>
              </div>
            </div>
            <Routes>
              <Route path="/" element={
                <>
                  <div className={"modal fade" + (!startGame ? " show d-block" : " d-none")} id="claimModal" aria-labelledby="claimModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content start-game-modal">
                        <div className="modal-body text-center">
                        <button className="btn p-0" data-dismiss="modal" onClick={(e) => {
                          setStartGame(true);
                          if (bgm.current && !bgmIsPlaying) {
                            bgm.current.play();
                            setBgmIsPlaying(true);
                          } 
                          else if (bgm.current && bgmIsPlaying) {
                            bgm.current.pause();
                            setBgmIsPlaying(false);
                          }
                        }}>
                          <img className="w-100" src={StartGame}></img>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div id="phaser-container" ref={gameContainerRef} style={{ width: '100%', height: '100%' }} />;
            
                </>
              }/>
              <Route path="/googoo" element={<GooGooPage/>}/>
              <Route path="/referral" element={<ReferralPage/>}/>
              <Route path="/earn" element={<EarnPage/>}/>
              <Route path="/friends" element={<FriendsPage/>}/>
              <Route path="/airdrop" element={<AirdropPage/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          
          <div className="navbar p-0" id='navbar'>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavHome} />
                  <p>Home</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/googoo" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavGG} />
                  <p>Gooo Gooo</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/earn" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavEarn} />
                  <p>Earn</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/friends" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavFriends} />
                  <p>Friends</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/airdrop" className={({ isActive }) => (isActive ? 'active-link' : '')}
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}>
                  <img className="nav-img "src={NavAirdrop} />
                  <p>Airdrop</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      /* <div className="modal fade" id="claimModal" tabIndex={-1} aria-labelledby="claimModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="claimModalLabel">Claim Your Points</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <p> You have earned {pointsEarned} points!</p>
            {boostedPoints > 0 && <p>With your boosters, you earned a total of {boostedPoints} points!</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div> */

  );
}


export default App;
