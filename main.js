const { exec } = require("child_process");

var delayDivs = 1; //Specified delay in video segments
var divSize = 10; //Size of video segments in seconds
var wait = divSize;

var playingSegment = 0;
var segmentPrefix = "segment_";

console.log("Program started fine...");

//Using test file instead of live input until decklink is available for testing
exec(("ffmpeg -i /home/bohoaush/Videos/testH265_2M.mp4 -c:v mpeg2video -b:v 50M -flags +ildct+ilme -c:a pcm_s24le -ar 48k -f segment -segment_time " + divSize + " -reset_timestamps 1 " + segmentPrefix + "%03d.mxf"), (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`ffmpeg said: ${stdout}`);
});

console.log("tst");

//timer
setInterval(function(){
    wait -= 1;
    if (wait < 1) {
        checkedSegment = playingSegment;
        if (checkedSegment < 100) {
            checkedSegment = "0" + checkedSegment;
            if (checkedSegment < 10) {
                checkedSegment = "0" + checkedSegment;
            }
        }
        checkedSegment = segmentPrefix + checkedSegment;
        console.log("CheckedSegment: " + checkedSegment);
    }
    
    
    
}, 1000);
