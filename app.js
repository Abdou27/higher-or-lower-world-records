// Données des records du monde
const worldRecords = [
    {
        title: "Le plus grand nombre de T-shirts enfilés en même temps",
        value: 260,
        unit: "T-shirts",
        holder: "Ted Hastings",
        year: "2019",
        context: "Ted a porté des t-shirts allant de medium à 20X et espérait lever des fonds pour une aire de jeux d'école."
    },
    {
        title: "La plus haute structure de dominos",
        value: 10.128,
        unit: "mètres",
        holder: "Team Hevesh5",
        year: "2024",
        context: "Une équipe de 11 personnes de 4 pays différents a construit cette tour au National Building Museum de Washington en 5 jours."
    },
    {
        title: "La plus grande cup de bubble tea",
        value: 680,
        unit: "litres",
        holder: "Mihara Keigo",
        year: "2018",
        context: "Cette gigantesque cup a été distribuée à des centaines de personnes lors d'un concert gratuit."
    },
    {
        title: "La plus haute pile de pancakes",
        value: 108.3,
        unit: "centimètres",
        holder: "Pancake on the Rocks",
        year: "2025",
        context: "Une pile impressionnante de pancakes qui défie la gravité !"
    },
    {
        title: "Le plus de chaussettes enfilées sur un pied en même temps",
        value: 184,
        unit: "chaussettes",
        holder: "Kamil Kulik",
        year: "2016",
        context: "Un pied très très chaud !"
    },
    {
        title: "La collection la plus vaste de canards en plastique",
        value: 5631,
        unit: "canards",
        holder: "Charlotte Lee",
        year: "2011",
        context: "De quoi prendre un bain très encombré !"
    },
    {
        title: "La plus longue moustache (hommes)",
        value: 63.5,
        unit: "centimètres",
        holder: "Paul Slosar",
        year: "2022",
        context: "Plus longue qu'une règle d'écolier !"
    },
    {
        title: "Le record de casse de pastèques avec la tête en 1 minute",
        value: 69,
        unit: "pastèques",
        holder: "Ankit Sahu",
        year: "2024",
        context: "Mal de tête garanti après cette performance !"
    },
    {
        title: "Le plus long hot-dog",
        value: 203.80,
        unit: "mètres",
        holder: "Novex S.A.",
        year: "2011",
        context: "Créé pour commémorer les 200 ans du Paraguay, il pesait 120kg de viande et a été distribué à 2000 personnes."
    },
    {
        title: "La plus longue session de câlin collectif (group hug)",
        value: 30,
        unit: "heures",
        holder: "Stephen Rattigan, Brian Cawley, Nicky Kearney, Robert Tuomey",
        year: "2019",
        context: "L'amour n'a pas de limites !"
    },
    {
        title: "Le plus de post-its collés sur le visage en 30 secondes",
        value: 38,
        unit: "post-its",
        holder: "Silvio Sabba",
        year: "2018",
        context: "Un visage très coloré et mémorable !"
    },
    {
        title: "La course de chaise de bureau la plus rapide (100m)",
        value: 31.92,
        unit: "secondes",
        holder: "André Ortolf",
        year: "2014",
        context: "Quand on vous dit de vous dépêcher au bureau !"
    },
    {
        title: "Le plus grand nombre de cuillers équilibrées sur le visage",
        value: 31,
        unit: "cuillers",
        holder: "Dalibor Jablanović",
        year: "2013",
        context: "Un visage très équilibré !"
    }
];

// Variables de jeu - MODIFIÉES pour le nouveau système
let gameState = {
    currentRecord: null,
    nextRecord: null,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentRound: 1,
    totalRounds: 12, // 13 records = 12 comparaisons
    shuffledRecords: [],
    gameActive: false
};

// Messages de fin personnalisés basés sur le score final
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

// Initialisation du jeu - MODIFIÉE
function startGame() {
    // Mélanger tous les records
    gameState.shuffledRecords = shuffleArray([...worldRecords]);
    
    gameState = {
        currentRecord: gameState.shuffledRecords[0],
        nextRecord: gameState.shuffledRecords[1],
        score: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        currentRound: 1,
        totalRounds: gameState.shuffledRecords.length - 1,
        shuffledRecords: gameState.shuffledRecords,
        gameActive: true
    };
    
    updateGameDisplay();
    showScreen('game-screen');
    
    // Animation d'entrée
    document.querySelector('.game-content').classList.add('animate-fade-in');
}

// Mise à jour de l'affichage du jeu - MODIFIÉE
function updateGameDisplay() {
    // Mise à jour du score (avec indication négative)
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

// Faire une supposition - COMPLÈTEMENT MODIFIÉE
function makeGuess(guess) {
    if (!gameState.gameActive) return;
    
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
        // Égalité - on considère cela comme correct
        isCorrect = true;
    }
    
    // Mise à jour des statistiques - NOUVEAU SYSTÈME
    if (isCorrect) {
        gameState.score += 1;  // +1 point
        gameState.correctAnswers++;
        showFeedback(true);
    } else {
        gameState.score -= 1;  // -1 point (peut être négatif)
        gameState.incorrectAnswers++;
        showFeedback(false);
    }
    
    // LE JEU CONTINUE TOUJOURS - après un délai
    setTimeout(() => {
        nextRound();
    }, 2500);
}

// Afficher le feedback - MODIFIÉ pour le jeu continu
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
            window.playTone && window.playTone(523, 0.2); // Do
            setTimeout(() => window.playTone && window.playTone(659, 0.3), 150); // Mi
        } catch (e) {}
    } else {
        feedback.classList.add('incorrect');
        icon.textContent = '💥';
        text.textContent = 'Oops ! -1 point, mais on continue !';
        feedback.classList.add('animate-shake');
        
        // Son d'échec (plus doux)
        try {
            window.playTone && window.playTone(300, 0.3);
        } catch (e) {}
    }
    
    // Mettre à jour le score immédiatement avec animation
    const scoreElement = document.getElementById('current-score');
    scoreElement.classList.add('animate-pulse');
    scoreElement.textContent = gameState.score;
    if (gameState.score < 0) {
        scoreElement.classList.add('negative');
    } else {
        scoreElement.classList.remove('negative');
    }
    
    // Nettoyer les classes d'animation après
    setTimeout(() => {
        feedback.classList.remove('animate-bounce', 'animate-shake');
        scoreElement.classList.remove('animate-pulse');
    }, 800);
}

// Prochaine manche - MODIFIÉE pour le système continu
function nextRound() {
    if (!gameState.gameActive) return;
    
    // Vérifier s'il reste des records
    if (gameState.currentRound >= gameState.totalRounds) {
        // Fin du jeu - tous les records vus
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

// Fin du jeu - MODIFIÉE pour le nouveau système
function endGame() {
    gameState.gameActive = false;
    
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
    startGame();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    showWelcome();
    
    // Ajouter les événements clavier pour les raccourcis
    document.addEventListener('keydown', function(e) {
        const currentScreen = document.querySelector('.screen.active').id;
        
        if (currentScreen === 'game-screen' && gameState.gameActive) {
            if (e.key === 'ArrowUp' || e.key === 'h' || e.key === 'H') {
                makeGuess('higher');
            } else if (e.key === 'ArrowDown' || e.key === 'l' || e.key === 'L') {
                makeGuess('lower');
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
        // Audio non supporté
        window.playTone = null;
    }
    
    // Messages d'encouragement aléatoires pour l'équipe
    const encouragementMessages = [
        "💭 Prenez le temps de discuter en équipe !",
        "🤝 La force de l'équipe dans la réflexion collective !",
        "💡 Mettez vos connaissances en commun !",
        "🎯 Ensemble, vous êtes plus forts !",
        "🧠 Brainstorming d'équipe en cours..."
    ];
    
    // Changer le message d'encouragement aléatoirement
    function updateTeamMessage() {
        const messageElement = document.querySelector('.team-message p');
        if (messageElement) {
            const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
            messageElement.innerHTML = `<em>${randomMessage}</em>`;
        }
    }
    
    // Changer le message toutes les 10 secondes quand on est sur l'écran de jeu
    setInterval(() => {
        if (document.querySelector('#game-screen').classList.contains('active')) {
            updateTeamMessage();
        }
    }, 10000);
});