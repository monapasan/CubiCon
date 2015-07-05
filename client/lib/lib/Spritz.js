Meteor.startup(function(){
    //
    // var SprayReader = function(container){
    //   this.container = container;
    // };
    // SprayReader.prototype = {
    //   wpm: null,
    //   msPerWord: null,
    //   wordIdx: null,
    //   input: null,
    //   words: null,
    //   isRunning: false,
    //   timers: [],
    //

function SpeedReader(options){
    this.intro = "Article starting in Five. Four. Three. Two. One. ";
    _.extend(this, options);
    // this.container = container;
    // this.onEnd = onEnd;
    clearTimeouts();
    var text_content;
    if(this.selection)
        this.setSelection.call(this,this.selection);
}

SpeedReader.prototype.setWpm = function setWpm(wpm){
    this.wpm = wpm;
};

SpeedReader.prototype.setSelection = function setSelection(selection, intro) {
    if(intro) this.intro = intro;
    text_content = this.intro + selection;
    text_content = text_content.replace(/\./g, '. '); // Make sure punctuation is apprpriately spaced.
    text_content = text_content.replace(/\?/g, '? ');
    text_content = text_content.replace(/\!/g, '! ');
    this.spritzify.call(this, text_content);
};
// The meat!
SpeedReader.prototype.spritzify = function spritzify(input){

    //this.wpm = parseInt(document.getElementById("spritz_selector").value, 10);

    // Split on any spaces.
    var all_words = input.split(/\s+/);

    // The reader won't stop if the selection starts or ends with spaces
    if (all_words[0] === "")
    {
        all_words = all_words.slice(1, all_words.length);
    }

    if (all_words[all_words.length - 1] === "")
    {
        all_words = all_words.slice(0, all_words.length - 1);
    }

    var word = '';
    var result = '';

    // Preprocess words
    var temp_words = all_words.slice(0); // copy Array
    var t = 0;

    for (var i=0; i<all_words.length; i++){

        if(all_words[i].indexOf('.') != -1){
            temp_words[t] = all_words[i].replace('.', '&#8226;');
        }

        // Double up on long words and words with commas.
        // if((all_words[i].indexOf(',') != -1 || all_words[i].indexOf(':') != -1 || all_words[i].indexOf('-') != -1 || all_words[i].indexOf('(') != -1|| all_words[i].length > 8) && all_words[i].indexOf('.') == -1){
        //     temp_words.splice(t+1, 0, all_words[i]);
        //     temp_words.splice(t+1, 0, all_words[i]);
        //     t++;
        //     t++;
        // }

        // Add an additional space after punctuation.
        if(all_words[i].indexOf('.') != -1 || all_words[i].indexOf('!') != -1 || all_words[i].indexOf('?') != -1 || all_words[i].indexOf(':') != -1 || all_words[i].indexOf(';') != -1|| all_words[i].indexOf(')') != -1){
            temp_words.splice(t+1, 0, " ");
            temp_words.splice(t+1, 0, " ");
            temp_words.splice(t+1, 0, " ");
            t++;
            t++;
            t++;
        }

        t++;

    }

    all_words = temp_words.slice(0);
    this.all_words = all_words;
    this.currentWord = 0;
    this.running = false;
    this.spritz_timers = [];


};

SpeedReader.prototype.updateValues = function updateValues(i) {

    var p = pivot(this.all_words[i]);
    //document.getElementById("spritz_result").innerHTML = p;
    this.container.setContent(p);
    this.currentWord = i;

};

SpeedReader.prototype.startSpritz = function startSpritz() {
    this.ms_per_word = 60000/this.wpm;
    this.running = true;
    this.spritz_timers.push(setInterval(function() {
        this.updateValues.call(this, this.currentWord);
        this.currentWord++;
        if(this.currentWord >= this.all_words.length) {
            this.currentWord = 0;
            this.stopSpritz();
            if(this.onEnd) this.onEnd();
        }
    }.bind(this),this.ms_per_word));
};
SpeedReader.prototype.stopSpritz = function stopSpritz() {
    for(var i = 0; i < this.spritz_timers.length; i++) {
        clearTimeout(this.spritz_timers[i]);
    }
    this.running = false;
};

// Find the red-character of the current word.
function pivot(word){
    var length = word.length;

    var bestLetter = 1;
    switch (length) {
        case 1:
            bestLetter = 1; // first
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            bestLetter = 2; // second
            break;
        case 6:
        case 7:
        case 8:
        case 9:
            bestLetter = 3; // third
            break;
        case 10:
        case 11:
        case 12:
        case 13:
            bestLetter = 4; // fourth
            break;
        default:
            bestLetter = 4; // fifth
    }

    word = decodeEntities(word);
    var start = '.'.repeat((7-bestLetter) < 0 ? 0 : (7-bestLetter) ) + word.slice(0, bestLetter-1).replace('.', '&#8226;');
    var middle = word.slice(bestLetter-1,bestLetter).replace('.', '&#8226;');
    var end = word.slice(bestLetter, length).replace('.', '&#8226;') + '.'.repeat((7-(word.length-bestLetter)) < 0 ? 0 : (7-(word.length-bestLetter)));

    var result;
    result = "<span class='spritz_start'>" + start;
    result = result + "</span><span class='spritz_pivot'>";
    result = result + middle;
    result = result + "</span><span class='spritz_end'>";
    result = result + end;
    result = result + "</span>";

    result = result.replace(/\./g, "<span class='invisible'>.</span>");

    return result;
}



//////
// Helpers
//////

// This is a hack using the fact that browers sequentially id the timers.
function clearTimeouts(){
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id);
    }
}

function decodeEntities(s){
    var str, temp= document.createElement('p');
    temp.innerHTML= s;
    str= temp.textContent || temp.innerText;
    temp=null;
    return str;
}

// Let strings repeat themselves,
// because JavaScript isn't as awesome as Python.
// String.prototype.repeat = function( num ){
//     if(num < 1){
//         return new Array( Math.abs(num) + 1 ).join( this );
//     }
//     return new Array( num + 1 ).join( this );
// };

    window.SpeedReader = SpeedReader;
});
