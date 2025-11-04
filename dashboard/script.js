// --- Save the Queen Game ---

// Arcade-style Save the Queen Game
function createSaveTheQueenGame() {
    const container = document.getElementById('save-queen-game-container');
    if (!container) return;
    container.innerHTML = '';

    // Game box
    const gameBox = document.createElement('div');
    gameBox.style.margin = '0 auto';
    gameBox.style.maxWidth = '100%';
    gameBox.style.width = '100%';
    gameBox.style.background = 'rgba(255, 248, 240, 0.98)';
    gameBox.style.borderRadius = '15px';
    gameBox.style.boxShadow = '0 5px 20px rgba(164, 117, 81, 0.12)';
    gameBox.style.padding = '20px 15px';
    gameBox.style.textAlign = 'center';
    gameBox.style.boxSizing = 'border-box';

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Save the Queen!👑 to get a special note hehe';
    title.style.color = '#a47551';
    title.style.marginBottom = '10px';
    gameBox.appendChild(title);

    // Instructions
    const instructions = document.createElement('p');
    instructions.textContent = 'Use arrow keys (← ↑ ↓ →) to reach the Queen (👸) and avoid the Dragon (🐉)!';
    instructions.style.color = '#5c3a1a';
    instructions.style.marginBottom = '18px';
    gameBox.appendChild(instructions);

    // Canvas - responsive sizing
    const canvas = document.createElement('canvas');
    const containerWidth = Math.min(380, window.innerWidth - 60); // Account for padding
    canvas.width = containerWidth;
    canvas.height = Math.floor(containerWidth * 0.55); // Maintain aspect ratio
    canvas.style.background = '#f5e9da';
    canvas.style.border = '2px solid #a47551';
    canvas.style.borderRadius = '10px';
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto 18px auto';
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    gameBox.appendChild(canvas);

    // Mobile arrow controls - responsive sizing
    const arrowControls = document.createElement('div');
    arrowControls.style.display = 'flex';
    arrowControls.style.flexDirection = 'column';
    arrowControls.style.alignItems = 'center';
    arrowControls.style.gap = '8px';
    arrowControls.style.marginBottom = '15px';
    arrowControls.style.width = '100%';
    arrowControls.style.maxWidth = '200px';
    arrowControls.style.marginLeft = 'auto';
    arrowControls.style.marginRight = 'auto';

    // Top row (Up button)
    const topRow = document.createElement('div');
    topRow.style.display = 'flex';
    topRow.style.justifyContent = 'center';

    const buttonSize = Math.min(50, Math.max(40, canvas.width * 0.12)); // Responsive button size
    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.style.width = buttonSize + 'px';
    upBtn.style.height = buttonSize + 'px';
    upBtn.style.border = 'none';
    upBtn.style.borderRadius = '50%';
    upBtn.style.background = 'linear-gradient(135deg, #a47551 0%, #8b5a3c 100%)';
    upBtn.style.color = 'white';
    upBtn.style.fontSize = Math.floor(buttonSize * 0.48) + 'px';
    upBtn.style.cursor = 'pointer';
    upBtn.style.boxShadow = '0 4px 15px rgba(164, 117, 81, 0.3)';
    upBtn.style.transition = 'all 0.2s ease';
    upBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleKey({ key: 'ArrowUp' });
        upBtn.style.transform = 'scale(0.95)';
    });
    upBtn.addEventListener('touchend', () => {
        upBtn.style.transform = 'scale(1)';
    });
    upBtn.addEventListener('mousedown', () => {
        handleKey({ key: 'ArrowUp' });
        upBtn.style.transform = 'scale(0.95)';
    });
    upBtn.addEventListener('mouseup', () => {
        upBtn.style.transform = 'scale(1)';
    });

    topRow.appendChild(upBtn);
    arrowControls.appendChild(topRow);

    // Bottom row (Left, Down, Right buttons)
    const bottomRow = document.createElement('div');
    bottomRow.style.display = 'flex';
    bottomRow.style.gap = '8px';

    const leftBtn = document.createElement('button');
    leftBtn.textContent = '←';
    leftBtn.style.width = buttonSize + 'px';
    leftBtn.style.height = buttonSize + 'px';
    leftBtn.style.border = 'none';
    leftBtn.style.borderRadius = '50%';
    leftBtn.style.background = 'linear-gradient(135deg, #a47551 0%, #8b5a3c 100%)';
    leftBtn.style.color = 'white';
    leftBtn.style.fontSize = Math.floor(buttonSize * 0.48) + 'px';
    leftBtn.style.cursor = 'pointer';
    leftBtn.style.boxShadow = '0 4px 15px rgba(164, 117, 81, 0.3)';
    leftBtn.style.transition = 'all 0.2s ease';
    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleKey({ key: 'ArrowLeft' });
        leftBtn.style.transform = 'scale(0.95)';
    });
    leftBtn.addEventListener('touchend', () => {
        leftBtn.style.transform = 'scale(1)';
    });
    leftBtn.addEventListener('mousedown', () => {
        handleKey({ key: 'ArrowLeft' });
        leftBtn.style.transform = 'scale(0.95)';
    });
    leftBtn.addEventListener('mouseup', () => {
        leftBtn.style.transform = 'scale(1)';
    });

    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.style.width = buttonSize + 'px';
    downBtn.style.height = buttonSize + 'px';
    downBtn.style.border = 'none';
    downBtn.style.borderRadius = '50%';
    downBtn.style.background = 'linear-gradient(135deg, #a47551 0%, #8b5a3c 100%)';
    downBtn.style.color = 'white';
    downBtn.style.fontSize = Math.floor(buttonSize * 0.48) + 'px';
    downBtn.style.cursor = 'pointer';
    downBtn.style.boxShadow = '0 4px 15px rgba(164, 117, 81, 0.3)';
    downBtn.style.transition = 'all 0.2s ease';
    downBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleKey({ key: 'ArrowDown' });
        downBtn.style.transform = 'scale(0.95)';
    });
    downBtn.addEventListener('touchend', () => {
        downBtn.style.transform = 'scale(1)';
    });
    downBtn.addEventListener('mousedown', () => {
        handleKey({ key: 'ArrowDown' });
        downBtn.style.transform = 'scale(0.95)';
    });
    downBtn.addEventListener('mouseup', () => {
        downBtn.style.transform = 'scale(1)';
    });

    const rightBtn = document.createElement('button');
    rightBtn.textContent = '→';
    rightBtn.style.width = buttonSize + 'px';
    rightBtn.style.height = buttonSize + 'px';
    rightBtn.style.border = 'none';
    rightBtn.style.borderRadius = '50%';
    rightBtn.style.background = 'linear-gradient(135deg, #a47551 0%, #8b5a3c 100%)';
    rightBtn.style.color = 'white';
    rightBtn.style.fontSize = Math.floor(buttonSize * 0.48) + 'px';
    rightBtn.style.cursor = 'pointer';
    rightBtn.style.boxShadow = '0 4px 15px rgba(164, 117, 81, 0.3)';
    rightBtn.style.transition = 'all 0.2s ease';
    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleKey({ key: 'ArrowRight' });
        rightBtn.style.transform = 'scale(0.95)';
    });
    rightBtn.addEventListener('touchend', () => {
        rightBtn.style.transform = 'scale(1)';
    });
    rightBtn.addEventListener('mousedown', () => {
        handleKey({ key: 'ArrowRight' });
        rightBtn.style.transform = 'scale(0.95)';
    });
    rightBtn.addEventListener('mouseup', () => {
        rightBtn.style.transform = 'scale(1)';
    });

    bottomRow.appendChild(leftBtn);
    bottomRow.appendChild(downBtn);
    bottomRow.appendChild(rightBtn);
    arrowControls.appendChild(bottomRow);

    // Show arrow controls for touch devices and mobile screens
    gameBox.insertBefore(arrowControls, canvas);

    // Message
    const message = document.createElement('div');
    message.style.marginTop = '12px';
    message.style.fontSize = '1.1rem';
    message.style.color = '#a47551';
    gameBox.appendChild(message);

    container.appendChild(gameBox);

    // Game logic - responsive positioning
    const ctx = canvas.getContext('2d');
    const scale = canvas.width / 400; // Scale factor based on original 400px width

    // Scale all game elements
    const player = { x: 20 * scale, y: 100 * scale, size: 22 * scale, color: '#a47551', emoji: '🧑‍🎤' };
    const queen = { x: (canvas.width - 40 * scale), y: 100 * scale, size: 22 * scale, emoji: '👸' };
    // Three dragons, all fast and with different starting positions
    const dragons = [
        { x: 150 * scale, y: 0, size: 28 * scale, speed: 3.5 * scale, dir: 1, emoji: '🐉' },
        { x: 230 * scale, y: canvas.height - 40 * scale, size: 28 * scale, speed: 2.8 * scale, dir: -1, emoji: '🐉' },
        { x: 300 * scale, y: 60 * scale, size: 28 * scale, speed: 3.2 * scale, dir: 1, emoji: '🐉' }
    ];
    let gameOver = false;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw Queen
        ctx.font = `${queen.size}px serif`;
        ctx.fillText(queen.emoji, queen.x, queen.y + queen.size);
        // Draw Dragons
        dragons.forEach(dragon => {
            ctx.font = `${dragon.size}px serif`;
            ctx.fillText(dragon.emoji, dragon.x, dragon.y + dragon.size);
        });
        // Draw Player
        ctx.font = `${player.size}px serif`;
        ctx.fillText(player.emoji, player.x, player.y + player.size);
    }

    function checkCollision(a, b) {
        return (
            a.x < b.x + b.size &&
            a.x + a.size > b.x &&
            a.y < b.y + b.size &&
            a.y + a.size > b.y
        );
    }

    function update() {
        if (gameOver) return;
        // Move dragons vertically
        dragons.forEach(dragon => {
            dragon.y += dragon.speed * dragon.dir;
            if (dragon.y <= 0 || dragon.y >= canvas.height - dragon.size) {
                dragon.dir *= -1;
            }
        });

        // Ensure dragons stay within bounds
        dragons.forEach(dragon => {
            dragon.y = Math.max(0, Math.min(canvas.height - dragon.size, dragon.y));
        });
        // Check collision with any dragon
        for (const dragon of dragons) {
            if (checkCollision(player, dragon)) {
                message.innerHTML = '<span style="color:#c0392b;">Oh no! The dragon caught you! 🐉<br>Try again!</span>';
                gameOver = true;
                setTimeout(createSaveTheQueenGame, 1800);
                return;
            }
        }
        // Check collision with queen
         if (checkCollision(player, queen)) {
             message.innerHTML = '<span style="color:#27ae60; font-size:1.3rem;">You saved the Queen! 👸🎉</span>';

             // Enhanced love note message
             setTimeout(() => {
                 message.innerHTML += '<br><div style="background: linear-gradient(135deg, #fff8f0, #fef7ed); border: 2px solid #a47551; border-radius: 15px; padding: 20px; margin: 15px 0; text-align: center; box-shadow: 0 4px 15px rgba(164, 117, 81, 0.2);">'
                     + '<h3 style="color: #a47551; margin: 0 0 15px 0; font-size: 1.4rem;">💌 A Special Love Note 💌</h3>'
                     + '<p style="color: #5c3a1a; font-size: 1.1rem; line-height: 1.6; margin: 10px 0; font-style: italic;">'
                     + '"My dearest Dinsanga, my hero, my Damdawimumlian and my everything... 💖<br><br>'
                     + 'Thank you for saving me and choosing me as your queen. '
                     + 'You are my knight in shining armor, my best friend, and the love of my life. '
                     + 'Every moment with you is magical, and I am so blessed to have you by my side.<br><br>'
                     + 'I love you more than words can express, and I promise to love you for all eternity. '
                     + 'Happy Birthday, my love! Let\'s celebrate this day for a long year and create countless beautiful memories together! 🌟<br><br>'
                     + '<span style="color: #a47551; font-size: 1.2rem; font-weight: bold;">P.S. Cringe deuh em? hehe 😘💕</span><br><br>'
                     + 'Forever yours,<br>Your Baby👸💕"'
                     + '</p>'
                     + '<div style="margin-top: 15px; font-size: 1.5rem;">💖 I LOVE YOU 💖</div>'
                     + '</div>';
             }, 800);

             // Add a beautiful heart animation
             setTimeout(() => {
                 message.innerHTML += '<br><div style="text-align: center; font-size: 2rem; animation: heartbeat 1s infinite;">💓</div>';
             }, 2000);

             gameOver = true;
             return;
         }
        draw();
        requestAnimationFrame(update);
    }

    function handleKey(e) {
        if (gameOver) return;
        const moveDistance = 18 * scale; // Scale movement distance
        switch (e.key) {
            case 'ArrowUp':
                player.y = Math.max(0, player.y - moveDistance);
                break;
            case 'ArrowDown':
                player.y = Math.min(canvas.height - player.size, player.y + moveDistance);
                break;
            case 'ArrowLeft':
                player.x = Math.max(0, player.x - moveDistance);
                break;
            case 'ArrowRight':
                player.x = Math.min(canvas.width - player.size, player.x + moveDistance);
                break;
        }
        draw();
    }

    window.addEventListener('keydown', handleKey);
    draw();
    update();

    // Clean up event listener if game is recreated
    container._cleanup = () => window.removeEventListener('keydown', handleKey);
}

// Automatically create the game when the section is shown
document.addEventListener('DOMContentLoaded', () => {
    // If the section is visible on load
    if (document.getElementById('save-queen')?.classList.contains('active')) {
        createSaveTheQueenGame();
    }
});

// Also create the game when navigating to the section
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn') && e.target.dataset.section === 'save-queen') {
        setTimeout(createSaveTheQueenGame, 100); // Wait for section to show
    }
});
// Birthday Collection Dashboard JavaScript

// Video playback with background music functionality
let currentVideo = null;
let currentMusic = null;
let videoVolume = 0.7;
let musicVolume = 0.4;

function playVideoWithMusic(songId) {
    const video = document.getElementById('memory-video');
    const music = document.getElementById(songId);

    console.log('Looking for video element:', video);
    console.log('Looking for music element:', music);

    if (!video || !music) {
        console.error('Video or music element not found');
        console.error('Video element:', video);
        console.error('Music element for', songId, ':', music);
        return;
    }

    // Stop any currently playing video and music
    stopVideoWithMusic();

    // Set current elements
    currentVideo = video;
    currentMusic = music;

    // Set volumes
    video.volume = videoVolume;
    music.volume = musicVolume;

    // Play both video and music
    Promise.all([
        video.play().catch(e => console.error('Video play failed:', e)),
        music.play().catch(e => console.error('Music play failed:', e))
    ]).then(() => {
        // Update play button
        const playBtn = document.getElementById('play-video-btn');
        if (playBtn) {
            playBtn.innerHTML = '⏸️ Pause Video';
            playBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }

        // Add visual feedback
        video.closest('.video-player-card').style.transform = 'scale(1.02)';
        video.closest('.video-player-card').style.boxShadow = '0 12px 35px rgba(164, 117, 81, 0.25)';
        video.closest('.video-player-card').style.border = '2px solid #a47551';

        console.log('Playing video with background music');
    }).catch(error => {
        console.error('Error playing video with music:', error);
        alert('Unable to play video or music. Please check that the files are accessible.');
    });
}

function toggleVideoPlayback() {
    const video = document.getElementById('memory-video');
    const playBtn = document.getElementById('play-video-btn');

    console.log('Toggle video - looking for elements');
    console.log('Video element:', video);
    console.log('Play button:', playBtn);

    if (!video) {
        console.error('Video element not found');
        // Wait a bit and try again
        setTimeout(() => {
            const retryVideo = document.getElementById('memory-video');
            if (retryVideo) {
                console.log('Video element found on retry');
                playVideoWithMusic('song1');
            } else {
                console.error('Video element still not found after retry');
            }
        }, 500);
        return;
    }

    if (video.paused) {
        // If no music is playing, start with the first song
        if (!currentMusic || currentMusic.paused) {
            playVideoWithMusic('song1');
        } else {
            // Just play video if music is already playing
            video.play().then(() => {
                playBtn.innerHTML = '⏸️ Pause Video';
                playBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            }).catch(error => {
                console.error('Error playing video:', error);
            });
        }
    } else {
        video.pause();
        playBtn.innerHTML = '▶️ Play Video';
        playBtn.style.background = 'linear-gradient(135deg, #a47551, #8b5a3c)';
    }
}

function stopVideoWithMusic() {
    const video = document.getElementById('memory-video');
    const playBtn = document.getElementById('play-video-btn');

    // Stop video
    if (video && !video.paused) {
        video.pause();
        video.currentTime = 0;
    }

    // Stop all music
    document.querySelectorAll('audio').forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    // Reset play button
    if (playBtn) {
        playBtn.innerHTML = '▶️ Play Video';
        playBtn.style.background = 'linear-gradient(135deg, #a47551, #8b5a3c)';
    }

    // Remove visual feedback
    const videoCard = video?.closest('.video-player-card');
    if (videoCard) {
        videoCard.style.transform = 'scale(1)';
        videoCard.style.boxShadow = '0 8px 25px rgba(164, 117, 81, 0.15)';
        videoCard.style.border = '2px solid rgba(164, 117, 81, 0.1)';
    }

    // Reset current elements
    currentVideo = null;
    currentMusic = null;

    console.log('Stopped video and music');
}

function setVideoVolume(volume) {
    const video = document.getElementById('memory-video');
    videoVolume = volume;

    if (video) {
        video.volume = volume;
    }
}

function setMusicVolume(volume) {
    const currentlyPlayingMusic = document.querySelector('audio:not([src*="memories"]):not([paused])');
    musicVolume = volume;

    if (currentlyPlayingMusic) {
        currentlyPlayingMusic.volume = volume;
    }
}

// Enhanced collection functionality (if not already defined)
if (typeof collection === 'undefined') {
    const collection = {
        addMemory() {
            alert('Memory upload feature coming soon! For now, enjoy the video collection.');
        },

        addMessage() {
            alert('Message feature coming soon! Stay tuned for updates.');
        }
    };
}

// Auto-pause video when switching sections
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn')) {
        const video = document.getElementById('memory-video');
        if (video && !video.paused) {
            const playBtn = document.getElementById('play-video-btn');
            video.pause();
            if (playBtn) {
                playBtn.innerHTML = '▶️ Play Video';
                playBtn.style.background = 'linear-gradient(135deg, #a47551, #8b5a3c)';
            }
        }
    }
});

// Initialize video functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Video functions should be available');
    // Make video functions globally available
    window.playVideoWithMusic = playVideoWithMusic;
    window.toggleVideoPlayback = toggleVideoPlayback;
    window.stopVideoWithMusic = stopVideoWithMusic;
    window.setVideoVolume = setVideoVolume;
    window.setMusicVolume = setMusicVolume;
});

// ...rest of your dashboard logic here (if needed)
