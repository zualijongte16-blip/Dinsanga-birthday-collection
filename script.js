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
    title.textContent = 'Save the Queen! 👑';
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
            message.innerHTML = '<span style="color:#27ae60;">You saved the Queen! 👸🎉</span>';
            // Custom congratulatory message
                        setTimeout(() => {
                                message.innerHTML += '<br><span style="color:#a47551; font-size:1.1rem; font-weight:bold; display:block; margin-top:10px;">'
                                    + 'To my dear Dinsanga...<br>'
                                    + 'Thank you for saving me and choosing me as your queen.<br>'
                                    + 'I LOVE YOU, and let’s celebrate this day together for many years to come! 💖'
                                    + '</span>';
                        }, 600);
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

class BirthdayCollection {
    constructor() {
        this.memories = this.loadFromStorage('memories') || [];
        this.messages = this.loadFromStorage('messages') || [];
        this.songCount = 6; // Fixed number of songs in playlist

        this.init();
        this.updateCounters();
    }

    init() {
        // Wishlist removed
        // Add event listeners for add buttons (they're created dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) {
                const section = e.target.onclick.toString().match(/add(\w+)/)?.[1]?.toLowerCase();
                if (section) {
                    this[`add${section.charAt(0).toUpperCase() + section.slice(1)}`]();
                }
            }
        });
    }


    // Memory Management
    addMemory() {
        const memoryText = prompt('Share your memory:');
        if (memoryText) {
            const memory = {
                id: Date.now(),
                text: memoryText,
                date: new Date().toISOString()
            };
            
            this.memories.push(memory);
            this.saveToStorage('memories', this.memories);
            this.displayMemories();
            this.updateCounters();
        }
    }

    displayMemories() {
        const memoriesList = document.getElementById('memories-list');
        if (!memoriesList) return;

        if (this.memories.length === 0) {
            memoriesList.innerHTML = '<div class="memory-placeholder"><p>Share your favorite moments and memories here!</p></div>';
            return;
        }

        memoriesList.innerHTML = this.memories.map(memory => `
            <div class="memory-card">
                <div class="memory-content">
                    <p>${memory.text}</p>
                    <small>${new Date(memory.date).toLocaleDateString()}</small>
                </div>
            </div>
        `).join('');
    }

    // Message Management
    addMessage() {
        const messageText = prompt('Write your love message:');
        if (messageText) {
            const message = {
                id: Date.now(),
                text: messageText,
                date: new Date().toISOString()
            };
            
            this.messages.push(message);
            this.saveToStorage('messages', this.messages);
            this.displayMessages();
            this.updateCounters();
        }
    }

    displayMessages() {
        const messagesList = document.getElementById('messages-list');
        if (!messagesList) return;

        if (this.messages.length === 0) {
            messagesList.innerHTML = '<div class="message-placeholder"><p>Write heartfelt messages and notes of love!</p></div>';
            return;
        }

        messagesList.innerHTML = this.messages.map(message => `
            <div class="message-card">
                <div class="message-content">
                    <p>${message.text}</p>
                    <small>${new Date(message.date).toLocaleDateString()}</small>
                </div>
            </div>
        `).join('');
    }

    // Wishlist Management
    addWish() {
        const wishText = prompt('Add item to wishlist:');
        if (wishText) {
            const wish = {
                id: Date.now(),
                text: wishText,
                completed: false,
                date: new Date().toISOString()
            };
            
            this.wishlist.push(wish);
            this.saveToStorage('wishlist', this.wishlist);
            this.displayWishlist();
            this.updateCounters();
        }
    }

    displayWishlist() {
        const wishlistList = document.getElementById('wishlist-list');
        if (!wishlistList) return;

        if (this.wishlist.length === 0) {
            wishlistList.innerHTML = '<div class="wishlist-placeholder"><p>Add items to your birthday wishlist!</p></div>';
            return;
        }

        wishlistList.innerHTML = this.wishlist.map(wish => `
            <div class="wishlist-card ${wish.completed ? 'completed' : ''}">
                <div class="wishlist-content">
                    <input type="checkbox" class="wish-checkbox" 
                           ${wish.completed ? 'checked' : ''} 
                           onchange="collection.toggleWish(${wish.id})">
                    <span class="wish-text">${wish.text}</span>
                    <small>${new Date(wish.date).toLocaleDateString()}</small>
                </div>
            </div>
        `).join('');
    }

    toggleWish(wishId) {
        const wish = this.wishlist.find(w => w.id === wishId);
        if (wish) {
            wish.completed = !wish.completed;
            this.saveToStorage('wishlist', this.wishlist);
            this.displayWishlist();
        }
    }

    // Utility Methods
    updateCounters() {
        document.getElementById('song-count').textContent = this.songCount;
        document.getElementById('memory-count').textContent = this.memories.length;
        document.getElementById('message-count').textContent = this.messages.length;
    }

    loadContent() {
        this.displayMemories();
        this.displayMessages();
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }
}

// Additional CSS for dynamically created elements
const additionalStyles = `

.memory-card, .message-card {
    background: white;
    border-radius: 10px;
    padding: 18px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
    border-left: 4px solid #888;
    border: 1px solid #e5e5e5;
}

.memory-content p, .message-content p {
    margin-bottom: 10px;
    color: #333;
    line-height: 1.6;
    font-size: 0.95rem;
}

.memory-content small, .message-content small {
    color: #777;
    font-size: 0.8rem;
}

.wishlist-card {
    background: white;
    border-radius: 10px;
    padding: 18px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid #e5e5e5;
}

.wishlist-card.completed {
    background: #f8f8f8;
    opacity: 0.75;
}

.wishlist-card.completed .wish-text {
    text-decoration: line-through;
    color: #999;
}

.wishlist-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.wish-checkbox {
    transform: scale(1.1);
    cursor: pointer;
    accent-color: #888;
}

.wish-text {
    flex: 1;
    color: #333;
    font-size: 0.95rem;
}

.wishlist-content small {
    color: #777;
    font-size: 0.8rem;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Video functionality
class VideoManager {
    constructor() {
        this.initVideo();
    }

    initVideo() {
        const video = document.getElementById('birthdayVideo');
        if (video) {
            console.log('🎥 Video element found, setting up...');

            // Handle video load errors
            video.addEventListener('error', (e) => {
                console.log('❌ Video error:', e);
                console.log('Error code:', video.error ? video.error.code : 'unknown');
                console.log('Error message:', video.error ? video.error.message : 'unknown');
                showVideoError();
            });

            // Handle successful video load
            video.addEventListener('loadedmetadata', () => {
                console.log('✅ Video metadata loaded');
                console.log('Size:', video.videoWidth + 'x' + video.videoHeight);
                console.log('Duration:', video.duration, 'seconds');
            });

            // Handle when video can play
            video.addEventListener('canplay', () => {
                console.log('▶️ Video can play now');
            });

            console.log('Video setup complete');
        } else {
            console.log('❌ Video element not found');
        }
    }

    showVideoFallback() {
        const videoContainer = document.querySelector('.header-video-container');
        const fallback = document.querySelector('.video-fallback');
        if (videoContainer && fallback) {
            fallback.style.display = 'block';
        }
    }

    // Method to ensure video plays with sound
    enableSound() {
        const video = document.querySelector('.header-video');
        if (video) {
            video.muted = false;
            video.volume = 0.7; // Set reasonable volume
            console.log('Video sound enabled');
        }
    }
}

// Simple video play function
function startVideo() {
    const video = document.getElementById('birthdayVideo');
    const overlay = document.getElementById('videoOverlay');

    console.log('Starting video...');
    console.log('Video element:', video);

    if (video) {
        // Hide the overlay
        overlay.style.display = 'none';

        // Try to play the video
        video.play().then(() => {
            console.log('✅ Video playing successfully');
        }).catch(error => {
            console.log('❌ Video play failed:', error);
            // Show overlay again with error
            overlay.style.display = 'flex';
            overlay.innerHTML = `
                <button onclick="startVideo()" style="background: white; color: #333; border: none; padding: 20px 30px; border-radius: 50%; font-size: 2rem; cursor: pointer;">
                    ⚠️
                </button>
                <h2 style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); margin: 0;">Video Error</h2>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Error: ${error.message}</p>
            `;
        });
    } else {
        console.log('❌ Video element not found');
        alert('Video element not found!');
    }
}

// Simple test function
function testVideo() {
    const video = document.getElementById('birthdayVideo');
    console.log('Video element:', video);
    console.log('Video src:', video.src);
    console.log('Video ready state:', video.readyState);
    console.log('Video error:', video.error);

    if (video.error) {
        console.log('Error code:', video.error.code);
        console.log('Error message:', video.error.message);
    }
}

// Video error handler function
function handleVideoError() {
    console.log('Video error occurred');
    showVideoError();
}

function showVideoError() {
    const overlay = document.getElementById('videoOverlay');
    if (overlay) {
        overlay.innerHTML = `
            <button onclick="startVideo()" style="background: #ff6b9d; color: white; border: none; padding: 15px 25px; border-radius: 25px; font-size: 1.2rem; cursor: pointer;">
                🔄 Retry Video
            </button>
            <h2 style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); margin: 20px 0 10px 0;">Video Not Loading</h2>
            <p style="color: rgba(255,255,255,0.9); margin: 0; text-align: center; font-size: 0.9rem;">
                The video file might be in an incompatible format.<br>
                Try converting it to standard MP4 format.
            </p>
        `;
    }
}

function testVideoFile() {
    const video = document.querySelector('.header-video');
    const fallback = document.querySelector('.video-fallback');

    console.log('🔧 Testing video file...');
    console.log('Video src:', video.src);
    console.log('Video error:', video.error);
    console.log('Video networkState:', video.networkState);
    console.log('Video readyState:', video.readyState);

    // Test file accessibility
    fetch('WhatsApp Video 2025-10-13 at 2.17.08 PM.mp4')
        .then(response => {
            console.log('✅ File is accessible, status:', response.status);
            console.log('Content type:', response.headers.get('content-type'));
            console.log('Content length:', response.headers.get('content-length'));

            if (fallback) {
                fallback.innerHTML = `
                    <p>✅ Video File is Accessible</p>
                    <p>File: WhatsApp Video 2025-10-13 at 2.17.08 PM.mp4</p>
                    <p>Size: 351KB</p>
                    <p>Status: File found and readable</p>
                    <button onclick="forcePlayVideo()">▶ Try Play Again</button>
                    <p style="font-size: 0.8rem;">If still not working, try different browser</p>
                `;
            }
        })
        .catch(error => {
            console.log('❌ File not accessible:', error);
            if (fallback) {
                fallback.innerHTML = `
                    <p>❌ Video File Not Accessible</p>
                    <p>Error: ${error.message}</p>
                    <p>File: WhatsApp Video 2025-10-13 at 2.17.08 PM.mp4</p>
                    <button onclick="location.reload()">Refresh Page</button>
                `;
            }
        });
}

function tryReloadVideo() {
    const video = document.querySelector('.header-video');
    if (video) {
        video.load();
        console.log('Reloading video...');
    }
}

// Test video file access
function testVideoAccess() {
    console.log('Testing video file access...');
    const videoFileName = 'WhatsApp Video 2025-10-13 at 2.17.08 PM.mp4';

    // Try to create a video element to test loading
    const testVideo = document.createElement('video');
    testVideo.src = videoFileName;
    testVideo.preload = 'metadata';

    testVideo.addEventListener('loadedmetadata', () => {
        console.log('✅ Video file is accessible!');
        console.log('Video dimensions:', testVideo.videoWidth + 'x' + testVideo.videoHeight);
        console.log('Video duration:', testVideo.duration, 'seconds');
    });

    testVideo.addEventListener('error', (e) => {
        console.log('❌ Video file not accessible');
        console.log('Error:', e);
    });

    console.log('Test video src set to:', testVideo.src);
}

// Navigation functionality
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = btn.dataset.section;

            // Remove active class from all buttons
            navBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');

                // Special handling for Save the Queen game
                if (targetSection === 'save-queen') {
                    setTimeout(createSaveTheQueenGame, 100);
                }
            }
        });
    });
}

// Initialize the application
const collection = new BirthdayCollection();
const videoManager = new VideoManager();

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();

    // Auto-activate playlist section if URL contains /playlist
    if (window.location.href.includes('/playlist') || window.location.pathname.includes('/playlist')) {
        setTimeout(() => {
            const playlistBtn = document.querySelector('[data-section="playlist"]');
            if (playlistBtn) {
                playlistBtn.click();
            }
        }, 100);
    }
});

// Test video access on page load
window.addEventListener('load', () => {
    setTimeout(testVideoAccess, 1000);
});

// Make functions globally available
window.handleVideoError = handleVideoError;
window.startVideo = startVideo;
window.testVideo = testVideo;
window.showVideoError = showVideoError;
window.collection = collection;