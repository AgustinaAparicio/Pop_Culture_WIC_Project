const songsByAlbum = {
    "Solo Album 1: Doo-Wops & Hooligans (Deluxe)": [
        "Grenade",
        "Just the Way You Are",
        "Our First Time",
        "Runaway Baby",
        "The Lazy Song",
        "Marry You",
        "Talking to the Moon",
        "Liquor Store Blues",
        "Count on Me",
        "The Other Side",
        "Somewhere in Brooklyn",
        "Talking to the Moon - Acoustic Piano",
        "Just the Way You Are - 2010 Remix"
    ],

    "Solo Album 2: Unorthodox Jukebox": [
        "Young Girls",
        "Locked Out of Heaven",
        "Gorilla",
        "Treasure",
        "Moonshine",
        "When I Was Your Man",
        "Natalie",
        "Show Me",
        "Money Makes Her Smile",
        "If I Knew"
    ],

    "Solo Album 3: 24K Magic": [
        "24K Magic",
        "Chunky",
        "Perm",
        "That's What I Like",
        "Versace on the Floor",
        "Straight up & Down",
        "Calling All My Lovelies",
        "Finesse",
        "Too Good to Say Goodbye"
    ],

    "Solo Album 4: The Romantic": [
        "Risk It All",
        "Cha Cha Cha",
        "I Just Might",
        "God Was Showing Off",
        "Why You Wanna Fight?",
        "On My Soul",
        "Something Serious",
        "Nothing Left",
        "Dance With Me"
    ],

    "Collab Album: An Evening With Silk Sonic": [
        "Silk Sonic Intro",
        "Leave The Door Open",
        "Fly As Me",
        "After Last Night",
        "Smokin Out The Window",
        "Put On A Smile",
        "777",
        "Skate",
        "Love's Train",
        "Blast Off"
    ],

    "Extras: Singles/Collabs": [
        "Uptown Funk",
        "Wake Up in the Sky",
        "Please Me",
        "BLOW",
        "Fat Juicy & Wet",
        "Bonde de Brunão",
        "Die With A Smile",
        "APT.",
    ]
}

function selectAll(albumId){
    const album = document.getElementById(albumId);
    const checkboxes = album.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = true);
}

function clearAll(albumId){
    const album = document.getElementById(albumId);
    const checkboxes = album.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);
}

function selectOrClearAll(albumCheck, albumId){
    if (albumCheck == true) {
        selectAll(albumId);
    } else {
        clearAll(albumId);
    }
}

let currentRound = [];

function shuffle(array){
  for(let i = array.length-1; i > 0; i--){
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTournament(){

  shuffle(songs);
  currentRound = [...songs];

  createRound(currentRound);
}

function createRound(players){

  const bracket = document.getElementById("bracket");
  bracket.innerHTML = "";

  let nextRound = [];

  for(let i=0;i<players.length;i+=2){

    const match = document.createElement("div");
    match.className = "match";

    const p1 = document.createElement("button");
    p1.textContent = players[i];

    const p2 = document.createElement("button");
    p2.textContent = players[i+1];

    p1.onclick = () => advance(players[i]);
    p2.onclick = () => advance(players[i+1]);

    match.appendChild(p1);
    match.appendChild(document.createTextNode(" vs "));
    match.appendChild(p2);

    bracket.appendChild(match);
  }

  function advance(song){

    nextRound.push(song);

    if(nextRound.length === players.length/2){

      if(nextRound.length === 1){
        bracket.innerHTML = `<h2>Winner: ${nextRound[0]}</h2>`;
      }else{
        createRound(nextRound);
      }

    }
  }

}

startTournament();