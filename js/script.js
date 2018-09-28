/* #6 start the #external #action and say hello */
console.log("App is alive");
var currentChannel; 
var currentLocation;

currentLocation = {
    longitude: 48.142894,
    latitude: 11.505274,
    what3words: "einbauen.gefallen.kobold"
};
console.log("Current location: ", currentLocation);



/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    //change global variable
    currentChannel = channelName;
    console.log(currentChannel);

    //change html
    document.getElementById('channel-name').innerHTML = channelName.name;
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/"'+channelName.createdBy+'" target="_blank"><strong>'+channelName.createdBy+'</strong></a>';

    channelName.starred ? $('#channel-star').removeClass('far fa-star').addClass('fas fa-star') : $('#channel-star').removeClass('fas fa-star').addClass('far fa-star');
   
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');
}

/* #6 #liking a channel on #click */
function star() {
    $('#channel-star, .selected i:first-child').toggleClass('far fa-star fas fa-star');
}



/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/**
 * Constructor: chat messages
 */
function Message(text) {
    this.createdBy= currentLocation.what3words;
    this.latitude= currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date(Date.now());
    this.expiresOn = new Date(this.createdOn.getTime() + (1000 /*sec*/ * 15 /*min*/ * 60));
    this.text = text;
    this.own = true;

    console.log(this.createdOn);
    console.log(this.expiresOn);
}

/**
 * Sending messages
 */
function sendMessage(){
    var mes = new Message($('#chat-bar input').val());
    createMessageElement(mes);
    $('#chat-bar input').val("");
}

/**
 * Creating messages
 */
function createMessageElement(messageObj) {
    var div = $('<div></div>');
    div.addClass("message");
    var headline = $('<h3></h3>');

    var link = $('<a></a>');
    link.attr('href', "http://w3w.co/"+messageObj.createdBy);
    link.attr('target', "_blank");
    var strongText = $('<strong></strong>');
    strongText.text(messageObj.createdBy);
    link.append(strongText);
    headline.append(link);

    //current Time
    var options = { weekday: 'short', month: 'long', day: '2-digit', hour: 'numeric', minute:'numeric', hour12: false};
    headline.append(messageObj.createdOn.toLocaleString('en-US', options));

    //emphasized text
    var emphasize = $('<em></em>');
    var calculateExpiresIn;
    var currentTime = new Date(Date.now());
     calculateExpiresIn = Math.round((messageObj.expiresOn - currentTime)/1000/60);
    emphasize.text(calculateExpiresIn + " min. left");
    headline.append(emphasize);

    //paragraph
    var textMes = $('<p></p>');
    textMes.text(messageObj.text);

    //button
    var extendTimeButton = $('<button></button>');
    extendTimeButton.text("+5 min.");

    div.append(headline);
    div.append(textMes);
    div.append(extendTimeButton);
    $('#messages').append(div);
}

function listChannels(){
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevenContinents));
    $('#channels ul').append(createChannelElement(killerApp));
    $('#channels ul').append(createChannelElement(firstPersonOnMars));
    $('#channels ul').append(createChannelElement(octoberfest));

    //select first channel 
    $('#channels li:contains(' + sevenContinents.name + ')').addClass('selected');
}

function createChannelElement(channelObject) {
    var li = $('<li></li>');
    li.attr('onclick', 'switchChannel('+JSON.stringify(channelObject)+')');
    li.text(channelObject.name);

    var span = $('<span></span>');
    span.addClass('channel-meta');
    if(channelObject.starred) {
        span.append('<i class = "fas fa-star"></i>');
    } else {
        span.append('<i class = "far fa-star"></i>');
    }
    span.append('<i class = "fas fa-chevron-right"></i>');
    li.append(span);
    return li;
}