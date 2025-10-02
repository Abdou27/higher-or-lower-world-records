// Données des records du monde avec images
const worldRecords = [
    {
        title: "Le plus grand nombre de T-shirts enfilés en même temps",
        value: 260,
        unit: "T-shirts",
        holder: "Ted Hastings",
        year: "2019",
        context: "Ted a porté des t-shirts allant de medium à 20X et espérait lever des fonds pour une aire de jeux d'école.",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/most-t-shirts-worn-at-once-header.jpg",
        imageAlt: "Ted Hastings portant 260 t-shirts simultanément pour le record du monde"
    },
    {
        title: "La plus haute structure de dominos",
        value: 10.128,
        unit: "mètres",
        holder: "Team Hevesh5",
        year: "2024",
        context: "Une équipe de 11 personnes de 4 pays différents a construit cette tour au National Building Museum de Washington en 5 jours.",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/tallest-domino-structure-header.jpg",
        imageAlt: "Tour de dominos record de plus de 10 mètres de hauteur"
    },
    {
        title: "La plus grande cup de bubble tea",
        value: 680,
        unit: "litres",
        holder: "Mihara Keigo",
        year: "2018",
        context: "Cette gigantesque cup a été distribuée à des centaines de personnes lors d'un concert gratuit.",
        imageUrl: null,
        imageAlt: null
    },
    {
        title: "La plus haute pile de pancakes",
        value: 108.3,
        unit: "centimètres",
        holder: "Pancake on the Rocks",
        year: "2025",
        context: "Une pile impressionnante de pancakes qui défie la gravité !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/tallest-stack-of-pancakes-header.png",
        imageAlt: "Pile record de pancakes de 108,3 cm de hauteur"
    },
    {
        title: "Le plus de chaussettes enfilées sur un pied en même temps",
        value: 184,
        unit: "chaussettes",
        holder: "Kamil Kulik",
        year: "2016",
        context: "Un pied très très chaud !",
        imageUrl: null,
        imageAlt: null
    },
    {
        title: "La collection la plus vaste de canards en plastique",
        value: 5631,
        unit: "canards",
        holder: "Charlotte Lee",
        year: "2011",
        context: "De quoi prendre un bain très encombré !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/largest-collection-of-rubber-ducks-header.jpg",
        imageAlt: "Collection record de 5631 canards en plastique"
    },
    {
        title: "La plus longue moustache (hommes)",
        value: 63.5,
        unit: "centimètres",
        holder: "Paul Slosar",
        year: "2022",
        context: "Plus longue qu'une règle d'écolier !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/689505-longest-moustache-on-a-living-person-male-header.jpg",
        imageAlt: "Homme avec la plus longue moustache du monde de 63,5 cm"
    },
    {
        title: "Le record de casse de pastèques avec la tête en 1 minute",
        value: 69,
        unit: "pastèques",
        holder: "Ankit Sahu",
        year: "2024",
        context: "Mal de tête garanti après cette performance !",
        imageUrl: null,
        imageAlt: null
    },
    {
        title: "Le plus long hot-dog",
        value: 203.80,
        unit: "mètres",
        holder: "Novex S.A.",
        year: "2011",
        context: "Créé pour commémorer les 200 ans du Paraguay, il pesait 120kg de viande et a été distribué à 2000 personnes.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/60m_Hot_Dog_Akasaka_Aug4_06.jpeg/800px-60m_Hot_Dog_Akasaka_Aug4_06.jpeg",
        imageAlt: "Hot-dog record de 203,80 mètres de longueur"
    },
    {
        title: "La plus longue session de câlin collectif (group hug)",
        value: 30,
        unit: "heures",
        holder: "Stephen Rattigan, Brian Cawley, Nicky Kearney, Robert Tuomey",
        year: "2019",
        context: "L'amour n'a pas de limites !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/longest-marathon-group-hug-header.jpg",
        imageAlt: "Session record de câlins collectifs de plus de 30 heures"
    },
    {
        title: "Le plus de post-its collés sur le visage en 30 secondes",
        value: 38,
        unit: "post-its",
        holder: "Silvio Sabba",
        year: "2018",
        context: "Un visage très coloré et mémorable !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/117183-most-sticky-notes-stuck-on-the-face-in-30-seconds-header.jpg",
        imageAlt: "Visage avec 38 post-its collés en 30 secondes record"
    },
    {
        title: "La course de chaise de bureau la plus rapide (100m)",
        value: 31.92,
        unit: "secondes",
        holder: "André Ortolf",
        year: "2014",
        context: "Quand on vous dit de vous dépêcher au bureau !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/chair-race-fastest-100-metres-header.jpg",
        imageAlt: "Course record en chaise de bureau en 31,92 secondes sur 100m"
    },
    {
        title: "Le plus grand nombre de cuillers équilibrées sur le visage",
        value: 31,
        unit: "cuillers",
        holder: "Dalibor Jablanović",
        year: "2013",
        context: "Un visage très équilibré !",
        imageUrl: "https://www.guinnessworldrecords.com/world-records/images/most-spoons-balanced-on-the-face-header.jpg",
        imageAlt: "Performance record de 31 cuillers équilibrées sur le visage"
    }
];

// Variables de jeu
let gameState = {
    currentRecord: null,
    nextRecord: null,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentRound: 1,
    totalRounds: 12,
    shuffledRecords: [],
    gameActive: false,
    imagesPreloaded: false,
    showingImage: false,
    autoTimer: null,
    timerInterval: null
};

// Préchargement des images
function preloadImages() {
    return new Promise((resolve) => {
        const imagePromises = worldRecords.map((record) => {
            return new Promise((resolveImg) => {
                const img = new Image();
                img.onload = () => resolveImg();
                img.onerror = () => resolveImg(); // Continue même si une image échoue
                img.src = record.imageUrl;
            });
        });
        
        Promise.all(imagePromises).then(() => {
            gameState.imagesPreloaded = true;
            resolve();
        });
    });
}

// Messages de fin personnalisés
function getFinalMessage(score, total) {
    const percentage = (score / total) * 100;
    
    if (score < 0) {
        return "🎲 Une prochaine fois sera la bonne ! L'important c'est d'avoir essayé en équipe !";
    } else if (score === 0) {
        return "⚖️ Parfaitement équilibré ! Vous êtes sur la bonne voie !";
    } else if (percentage >= 80) {
        return "👑 Champions des Records ! Votre équipe maîtrise parfaitement !";
    } else if (percentage >= 60) {
        return "🏆 Excellent travail d'équipe ! Vous connaissez bien les records !";
    } else if (percentage >= 40) {
        return "🎯 Bien joué ! Votre collaboration porte ses fruits !";
    } else {
        return "🌟 Pas mal du tout ! Continuez à travailler ensemble !";
    }
}

// Fonctions utilitaires
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function formatValue(value) {
    if (value >= 1000) {
        return value.toLocaleString('fr-FR');
    }
    return value.toString();
}

// Gestion des écrans
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showWelcome() {
    showScreen('welcome-screen');
}

// Affichage du préchargeur
function showImagePreloader() {
    document.getElementById('image-preloader').classList.remove('hidden');
}

function hideImagePreloader() {
    document.getElementById('image-preloader').classList.add('hidden');
}

// Fonction pour nettoyer les timers
function clearAllTimers() {
    if (gameState.autoTimer) {
        clearTimeout(gameState.autoTimer);
        gameState.autoTimer = null;
    }
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

// Initialisation du jeu
async function startGame() {
    // Nettoyer les timers précédents
    clearAllTimers();
    
    // Afficher le préchargeur si nécessaire
    if (!gameState.imagesPreloaded) {
        showImagePreloader();
        await preloadImages();
        hideImagePreloader();
    }
    
    // Mélanger tous les records
    gameState.shuffledRecords = shuffleArray([...worldRecords]);
    
    gameState = {
        ...gameState,
        currentRecord: gameState.shuffledRecords[0],
        nextRecord: gameState.shuffledRecords[1],
        score: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        currentRound: 1,
        totalRounds: gameState.shuffledRecords.length - 1,
        shuffledRecords: gameState.shuffledRecords,
        gameActive: true,
        showingImage: false
    };
    
    updateGameDisplay();
    showScreen('game-screen');
    
    // Animation d'entrée
    document.querySelector('.game-content').classList.add('animate-fade-in');
}

// Mise à jour de l'affichage du jeu
function updateGameDisplay() {
    // Cacher la section d'images
    hideRecordImage();
    
    // Mise à jour du score
    const scoreElement = document.getElementById('current-score');
    scoreElement.textContent = gameState.score;
    if (gameState.score < 0) {
        scoreElement.classList.add('negative');
    } else {
        scoreElement.classList.remove('negative');
    }
    
    // Mise à jour de la progression
    document.getElementById('progress-counter').textContent = 
        `${gameState.currentRound}/${gameState.totalRounds}`;
    
    // Mise à jour du record actuel (connu)
    const currentRecord = gameState.currentRecord;
    document.getElementById('current-record-title').textContent = currentRecord.title;
    document.getElementById('current-record-value').textContent = formatValue(currentRecord.value);
    document.getElementById('current-record-unit').textContent = currentRecord.unit;
    document.getElementById('current-record-holder').textContent = `${currentRecord.holder} (${currentRecord.year})`;
    document.getElementById('current-record-context').textContent = currentRecord.context;
    
    // Mise à jour du record suivant (inconnu)
    const nextRecord = gameState.nextRecord;
    document.getElementById('next-record-title').textContent = nextRecord.title;
    document.getElementById('next-record-value').textContent = '?';
    document.getElementById('next-record-unit').textContent = nextRecord.unit;
    document.getElementById('next-record-holder').textContent = `${nextRecord.holder} (${nextRecord.year})`;
    document.getElementById('next-record-context').textContent = nextRecord.context;
    
    // Réactiver les boutons
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = false;
    });
    
    // Cacher le feedback
    document.getElementById('result-feedback').classList.add('hidden');
    
    // Remettre la valeur mystère
    document.getElementById('next-record-value').classList.add('mystery-value');
}

// FONCTION : Afficher l'image du record
function showRecordImage(record) {
    if (!record.imageUrl) {
        continueToNext();
        return;
    }

    console.log('Affichage de l\'image pour:', record.title); // Debug
    
    const imageSection = document.getElementById('record-image-section');
    const recordImage = document.getElementById('record-image');
    const imageTitle = document.getElementById('image-title');
    const imageDescription = document.getElementById('image-description');
    
    // Configurer l'image
    recordImage.src = record.imageUrl;
    recordImage.alt = record.imageAlt;
    imageTitle.textContent = record.title;
    imageDescription.textContent = `${formatValue(record.value)} ${record.unit} - ${record.context}`;
    
    // Afficher avec animation
    imageSection.classList.remove('hidden');
    imageSection.classList.add('show');
    
    gameState.showingImage = true;
    
    // Démarrer le timer auto-continue
    startAutoTimer();
}

// FONCTION : Cacher l'image du record
function hideRecordImage() {
    const imageSection = document.getElementById('record-image-section');
    if (imageSection) {
        imageSection.classList.add('hidden');
        imageSection.classList.remove('show');
    }
    gameState.showingImage = false;
    
    // Arrêter tous les timers
    clearAllTimers();
}

// FONCTION : Timer auto-continue
function startAutoTimer() {
    console.log('Démarrage du timer auto-continue'); // Debug
    
    let countdown = 61;
    const timerElement = document.getElementById('timer-countdown');
    
    if (!timerElement) {
        console.error('Timer element not found');
        return;
    }
    
    timerElement.textContent = countdown;
    timerElement.classList.remove('urgent');
    
    gameState.timerInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        
        if (countdown <= 2) {
            timerElement.classList.add('urgent');
        }
        
        if (countdown <= 0) {
            clearInterval(gameState.timerInterval);
            gameState.timerInterval = null;
            console.log('Timer terminé, passage au suivant'); // Debug
            continueToNext();
        }
    }, 1000);
}

// FONCTION : Continuer vers le prochain record
function continueToNext() {
    console.log('Continuation vers le prochain record'); // Debug

    if (gameState.showingImage) {
        hideRecordImage();
    }
    
    // Passer au record suivant après un court délai
    setTimeout(() => {
        nextRound();
    }, 500);
}

// Faire une supposition
function makeGuess(guess) {
    if (!gameState.gameActive || gameState.showingImage) return;
    
    console.log('Guess fait:', guess); // Debug
    
    // Désactiver les boutons
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Révéler la valeur
    const nextValueElement = document.getElementById('next-record-value');
    nextValueElement.textContent = formatValue(gameState.nextRecord.value);
    nextValueElement.classList.remove('mystery-value');
    
    // Vérifier la réponse
    const currentValue = gameState.currentRecord.value;
    const nextValue = gameState.nextRecord.value;
    let isCorrect = false;
    
    if (guess === 'higher' && nextValue > currentValue) {
        isCorrect = true;
    } else if (guess === 'lower' && nextValue < currentValue) {
        isCorrect = true;
    } else if (nextValue === currentValue) {
        isCorrect = true;
    }
    
    // Mise à jour des statistiques
    if (isCorrect) {
        gameState.score += 1;
        gameState.correctAnswers++;
        showFeedback(true);
    } else {
        gameState.score -= 1;
        gameState.incorrectAnswers++;
        showFeedback(false);
    }

    // Afficher l'image après le feedback
    setTimeout(() => {
        console.log('Affichage de l\'image après feedback'); // Debug
        showRecordImage(gameState.nextRecord);
    }, 2000); // Réduit à 2 secondes pour un feedback plus rapide
}

// Afficher le feedback
function showFeedback(isCorrect) {
    const feedback = document.getElementById('result-feedback');
    const icon = feedback.querySelector('.feedback-icon');
    const text = feedback.querySelector('.feedback-text');
    
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        icon.textContent = '🎉';
        text.textContent = 'Bravo équipe ! +1 point !';
        feedback.classList.add('animate-bounce');
        
        // Son de succès
        try {
            window.playTone && window.playTone(523, 0.2);
            setTimeout(() => window.playTone && window.playTone(659, 0.3), 150);
        } catch (e) {}
    } else {
        feedback.classList.add('incorrect');
        icon.textContent = '💥';
        text.textContent = 'Oops ! -1 point, mais on continue !';
        feedback.classList.add('animate-shake');
        
        // Son d'échec
        try {
            window.playTone && window.playTone(300, 0.3);
        } catch (e) {}
    }
    
    // Mettre à jour le score immédiatement
    const scoreElement = document.getElementById('current-score');
    scoreElement.classList.add('animate-pulse');
    scoreElement.textContent = gameState.score;
    if (gameState.score < 0) {
        scoreElement.classList.add('negative');
    } else {
        scoreElement.classList.remove('negative');
    }
    
    // Nettoyer les classes d'animation
    setTimeout(() => {
        feedback.classList.remove('animate-bounce', 'animate-shake');
        scoreElement.classList.remove('animate-pulse');
    }, 800);
}

// Prochaine manche
function nextRound() {
    if (!gameState.gameActive) return;
    
    console.log('Passage à la manche suivante, round:', gameState.currentRound); // Debug
    
    // Vérifier s'il reste des records
    if (gameState.currentRound >= gameState.totalRounds) {
        console.log('Fin du jeu'); // Debug
        endGame();
        return;
    }
    
    // Passer au record suivant
    gameState.currentRound++;
    gameState.currentRecord = gameState.nextRecord;
    gameState.nextRecord = gameState.shuffledRecords[gameState.currentRound];
    
    updateGameDisplay();
    
    // Animation de transition
    document.querySelector('.records-container').classList.add('animate-fade-in');
    setTimeout(() => {
        document.querySelector('.records-container').classList.remove('animate-fade-in');
    }, 600);
}

// Fin du jeu
function endGame() {
    gameState.gameActive = false;
    gameState.showingImage = false;
    
    // Arrêter tous les timers
    clearAllTimers();
    
    // Mise à jour des statistiques finales
    const finalScoreElement = document.getElementById('final-score');
    finalScoreElement.textContent = gameState.score;
    if (gameState.score < 0) {
        finalScoreElement.classList.add('negative');
    }
    
    document.getElementById('correct-answers').textContent = gameState.correctAnswers;
    document.getElementById('incorrect-answers').textContent = gameState.incorrectAnswers;
    
    // Message personnalisé selon le score final
    const message = getFinalMessage(gameState.score, gameState.totalRounds);
    document.getElementById('final-message').innerHTML = `<p>${message}</p>`;
    
    showScreen('end-screen');
    
    // Animation d'entrée
    document.querySelector('.end-content').classList.add('animate-fade-in');
}

// Redémarrer le jeu
function restartGame() {
    clearAllTimers();
    startGame();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, initialisation...'); // Debug
    
    showWelcome();
    
    // Précharger les images en arrière-plan
    setTimeout(() => {
        if (!gameState.imagesPreloaded) {
            preloadImages();
        }
    }, 1000);
    
    // Ajouter les événements clavier
    document.addEventListener('keydown', function(e) {
        const currentScreen = document.querySelector('.screen.active').id;
        
        if (currentScreen === 'game-screen' && gameState.gameActive) {
            if (gameState.showingImage) {
                // Si on montre une image, Espace ou Entrée pour continuer
                if (e.key === 'Enter' || e.key === ' ') {
                    continueToNext();
                }
            } else {
                // Sinon, contrôles normaux
                if (e.key === 'ArrowUp' || e.key === 'h' || e.key === 'H') {
                    makeGuess('higher');
                } else if (e.key === 'ArrowDown' || e.key === 'l' || e.key === 'L') {
                    makeGuess('lower');
                }
            }
        } else if (currentScreen === 'welcome-screen') {
            if (e.key === 'Enter' || e.key === ' ') {
                startGame();
            }
        } else if (currentScreen === 'end-screen') {
            if (e.key === 'Enter' || e.key === ' ') {
                restartGame();
            }
        }
    });
    
    // Système audio simple pour les effets sonores
    try {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        window.playTone = function(frequency, duration) {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, window.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, window.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + duration);
            
            oscillator.start(window.audioContext.currentTime);
            oscillator.stop(window.audioContext.currentTime + duration);
        };
    } catch (e) {
        window.playTone = null;
    }
    
    // Messages d'encouragement aléatoires
    const encouragementMessages = [
        "💭 Prenez le temps de discuter en équipe !",
        "🤝 La force de l'équipe dans la réflexion collective !",
        "💡 Mettez vos connaissances en commun !",
        "🎯 Ensemble, vous êtes plus forts !",
        "🧠 Brainstorming d'équipe en cours...",
        "🖼️ Des images spectaculaires vous attendent !",
        "🏆 Chaque record révèle son secret visuel !"
    ];
    
    function updateTeamMessage() {
        const messageElement = document.querySelector('.team-message p');
        if (messageElement && !gameState.showingImage) {
            const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
            messageElement.innerHTML = `<em>${randomMessage}</em>`;
        }
    }
    
    // Changer le message toutes les 10 secondes
    setInterval(() => {
        if (document.querySelector('#game-screen').classList.contains('active')) {
            updateTeamMessage();
        }
    }, 10000);
    
    // Gestion de l'erreur de chargement d'images
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Erreur de chargement d\'image:', e.target.src);
            // Fallback: afficher un texte à la place
            const container = e.target.closest('.image-container');
            if (container) {
                container.innerHTML = `
                    <div class="image-fallback">
                        <div class="fallback-icon">🖼️</div>
                        <div class="fallback-text">Image du record : ${gameState.nextRecord ? gameState.nextRecord.title : 'Record du monde'}</div>
                        <div class="fallback-context">${gameState.nextRecord ? gameState.nextRecord.context : ''}</div>
                    </div>
                `;
            }
        }
    }, true);
});

// Styles pour le fallback d'images (ajouté dynamiquement)
const fallbackStyle = document.createElement('style');
fallbackStyle.textContent = `
    .image-fallback {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        background: var(--color-bg-1);
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-lg);
        color: var(--color-text);
        padding: var(--space-24);
        text-align: center;
    }
    .fallback-icon {
        font-size: 3rem;
        margin-bottom: var(--space-16);
    }
    .fallback-text {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-medium);
        margin-bottom: var(--space-12);
    }
    .fallback-context {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        font-style: italic;
    }
`;
document.head.appendChild(fallbackStyle);