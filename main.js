const { exec } = require("child_process");

var delayDivs = 1; //Specified delay in video segments
var divSize = 10; //Size of video segments in seconds

console.log("Program started fine...");

//Using test file instead of live input until decklink is available for testing
exec(("ffmpeg -i /home/bohoaush/Videos/testH265_2M.mp4 -c:v mpeg2video -b:v 50M -flags +ildct+ilme -c:a pcm_s24le -ar 48k -f segment -segment_time " + divSize + " -reset_timestamps 1 segment_%03d.mxf"), (error, stdout, stderr) => {
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
