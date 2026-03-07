const songs = [
    {
        file: "Songs/Finesse_24k_Magic.mp3",
        answers: ["I just Might", "Gernade", "Finesse"],
        correct: "Finesse"
    },
    {
        file: "Songs/Grenade_Doo_woops_Hooligans.mp3",
        answers: ["Song D", "Song E", "Song F"], 
        correct: "Song E"
    },
    {
        file: "Songs/I_Just_Might_The_Romantic.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    },
    {
        file: "Songs/Leave_the_door_open_An_evening_w_Silk_Sonic.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    },
    {
        file: "Songs/Locked_Out_Of_Heaven_Unorthadox_Jucebox.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    },
    {
        file: "Songs/Risk_It_All_The_Romantic.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    },
    {
        file: "Songs/Smokin_Out_The_Window_An_evening_w_Silk_Sonic.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    },
    {
        file: "Songs/Talking_To_The_Moon_Doo_woops_Hooligans.mp3",
        answers: ["Track X", "Track Y", "Track Z"],
        correct: "Track Z"
    },
    {
        file: "Songs/That's_What_I_Like_24k_Magic.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    },
    {
        file: "Songs/When_I_Was_Your_Man_Unorthadox_Jucebox.mp3",
        answers: ["Track X", "Track Y", "Track Z"], 
        correct: "Track Z"
    }
];

let currentSong = 0;
let guessesLeft = 3;
let playCount = 0;
let gameOverForSong = false;

const audio = document.getElementById("song");
const message = document.getElementById("message");
const guesses = document.getElementById("guesses");
const playButton = document.querySelector("button[onclick='playClip()']");
const answersDiv = document.getElementById("answers");

loadSong();

function loadSong() {
    // Reset state
    audio.src = songs[currentSong].file;
    guessesLeft = 3;
    playCount = 0;
    gameOverForSong = false;
    guesses.textContent = "Guesses Left: " + guessesLeft;
    message.textContent = "";
    playButton.textContent = "Play Clip";
    playButton.disabled = false;

    // Clear previous buttons
    answersDiv.innerHTML = "";

    // Generate buttons for the current song
    songs[currentSong].answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(answer);
        answersDiv.appendChild(btn);
    });
}

function playClip() {
    let playTime = 0;

    if (gameOverForSong) {
        playTime = 10000; // full song
        playButton.textContent = "Playing Full Song";
    } else {
        if (playCount === 0) {
            playTime = 1000; // 1 sec
            playButton.textContent = "Try Again (5 sec)";
        } else if (playCount === 1) {
            playTime = 5000; // 5 sec
            playButton.textContent = "Last Try (10 sec)";
        } else {
            playTime = 10000; // last preview
            playButton.textContent = "Preview Only";
        }
        playCount++;
    }

    audio.currentTime = 3;
    audio.play();
    playButton.disabled = true;

    setTimeout(() => {
        audio.pause();
        playButton.disabled = false;

        if (!gameOverForSong) {
            if (guessesLeft === 2) playButton.textContent = "Try Again (5 sec)";
            else if (guessesLeft === 1) playButton.textContent = "Last Try (10 sec)";
            else playButton.textContent = "Play Clip";
        } else {
            playButton.textContent = "Play Full Song";
        }
    }, playTime);
}

function checkAnswer(answer) {
    audio.pause();
    playButton.disabled = false;

    if (guessesLeft <= 0 || gameOverForSong) return;

    if (answer === songs[currentSong].correct) {
        message.textContent = "🎉 Correct!";
        guessesLeft = 0;
        gameOverForSong = true;
        playButton.textContent = "Play Full Song";
    } else {
        guessesLeft--;
        message.textContent = "❌ Wrong!";
        if (guessesLeft === 2) playButton.textContent = "Try Again (5 sec)";
        if (guessesLeft === 1) playButton.textContent = "Last Try (10 sec)";
    }

    guesses.textContent = "Guesses Left: " + guessesLeft;

    if (guessesLeft === 0 && answer !== songs[currentSong].correct) {
        message.textContent = "Out of guesses! Correct answer was " + songs[currentSong].correct;
        gameOverForSong = true;
        playButton.textContent = "Play Full Song";
    }
}

function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) {
        message.textContent = "Game Over!";
        playButton.disabled = true;
        answersDiv.innerHTML = "";
        return;
    }
    loadSong();
}