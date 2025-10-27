// --- Save the Queen Game ---

// Arcade-style Save the Queen Game
function createSaveTheQueenGame() {
    const container = document.getElementById('save-queen-game-container');
    if (!container) return;
    container.innerHTML = '';

    // Game box
    const gameBox = document.createElement('div');
    gameBox.style.margin = '0 auto';
    gameBox.style.maxWidth = '420px';
    gameBox.style.background = 'rgba(255, 248, 240, 0.98)';
    gameBox.style.borderRadius = '15px';
    gameBox.style.boxShadow = '0 5px 20px rgba(164, 117, 81, 0.12)';
    gameBox.style.padding = '30px 20px';
    gameBox.style.textAlign = 'center';

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

    // Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 220;
    canvas.style.background = '#f5e9da';
    canvas.style.border = '2px solid #a47551';
    canvas.style.borderRadius = '10px';
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto 18px auto';
    gameBox.appendChild(canvas);

    // Message
    const message = document.createElement('div');
    message.style.marginTop = '12px';
    message.style.fontSize = '1.1rem';
    message.style.color = '#a47551';
    gameBox.appendChild(message);

    container.appendChild(gameBox);

    // Game logic
    const ctx = canvas.getContext('2d');
    // Make player and queen smaller for more challenge
    const player = { x: 20, y: 100, size: 22, color: '#a47551', emoji: '🧑‍🎤' };
    const queen = { x: 360, y: 100, size: 22, emoji: '👸' };
    // Three dragons, all fast and with different starting positions
    const dragons = [
        { x: 150, y: 0, size: 28, speed: 3.5, dir: 1, emoji: '🐉' },
        { x: 230, y: 180, size: 28, speed: 2.8, dir: -1, emoji: '🐉' },
        { x: 300, y: 60, size: 28, speed: 3.2, dir: 1, emoji: '🐉' }
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
        switch (e.key) {
            case 'ArrowUp':
                player.y = Math.max(0, player.y - 18);
                break;
            case 'ArrowDown':
                player.y = Math.min(canvas.height - player.size, player.y + 18);
                break;
            case 'ArrowLeft':
                player.x = Math.max(0, player.x - 18);
                break;
            case 'ArrowRight':
                player.x = Math.min(canvas.width - player.size, player.x + 18);
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
