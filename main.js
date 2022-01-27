const { exec } = require("child_process");

var delayDivs = 1; //Specified delay in video segments
var divSize = 60; //Size of video segments in seconds

console.log("Program started fine...");

exec("ffplay /home/bohoaush/Videos/testH265_2M.mp4", (error, stdout, stderr) => {
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
