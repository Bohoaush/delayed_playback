const {CasparCG} = require("casparcg-connection");
const { exec } = require("child_process");
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

var delayDivs = 2; //Specified delay in video segments
var divSize = 10; //Size of video segments in seconds
var wait = divSize;

var ccg_ip = "127.0.0.1";
var ccg_port = 5250;

var playingSegment = 0;
var nextSegment = "000";
var segmentPrefix = "segment_";
var status = "stopped";

console.log("Program started fine in " + appDir + "...");

//Using test file instead of live input until decklink is available for testing
/*exec(("ffmpeg -i /home/bohoaush/Videos/testH265_2M.mp4 -c:v mpeg2video -b:v 50M -flags +ildct+ilme -c:a pcm_s24le -ar 48k -f segment -segment_time " + divSize + " -reset_timestamps 1 " + segmentPrefix + "%03d.mxf"), (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`ffmpeg said: ${stdout}`);
});*/

var ccgconn = new CasparCG(ccg_ip, ccg_port);
var delayedStart = (delayDivs * divSize * 1000);
console.log("Delayed start: " + delayedStart);
setTimeout(function(){
    ccgconn.play(1, 1, "file://" + appDir + "/segment_000.mxf")
    status = "playing";
    
}, (delayedStart));

/*ccgconn.play(1,1, "file://" + appDir + "/segment_000.mxf");
ccgconn.loadbgAuto(1,1, "file://" + appDir + "/segment_001.mxf", false, "CUT", undefined, "none", "right", 5);*/

//timer
setInterval(async function(){
    wait -= 1;
    if (wait < 1 && status == "playing") {
        checkedSegment = nextSegment;
        /*if (checkedSegment < 100) {
            checkedSegment = "0" + checkedSegment;
            if (checkedSegment < 10) {
                checkedSegment = "0" + checkedSegment;
            }
        }*/
        checkedSegmentString = "file://" + appDir + "/" + segmentPrefix + checkedSegment + ".mxf";
        console.log("CheckedSegment: " + checkedSegmentString);
        var fullCCGinfo = await ccgconn.info(1, 1);
        var curPlayingName = fullCCGinfo.response.data.stage.layer.layer_1.foreground.file.name;
        console.log("currently playing: " + curPlayingName);
        if (curPlayingName == checkedSegmentString) {
            playingSegment = nextSegment;
            nextSegment -= -1;
            if (nextSegment < 100) {
                nextSegment = "0" + nextSegment;
                if (nextSegment < 10) {
                    nextSegment = "0" + nextSegment;
                }
            }
            checkedSegmentString = checkedSegmentString.replace(checkedSegment,nextSegment);
            console.log("playing: " + playingSegment + "next: " + nextSegment);
            ccgconn.loadbgAuto(1,1,checkedSegmentString);
        }
        
        wait = (divSize / 2);
    }
    
    
    
}, 1000);
