song = "";

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(700,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("Model is Loaded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("LeftWrist = "+ scoreLeftWrist + " , RightWrist = " + scoreRightWrist);

        console.log("leftWristX = " + leftWristX + " , leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + " , rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video,0,0,700,500);

    fill("blue");
    stroke("darkblue");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,30);
        number = Number(leftWristY);
        Remove_decimal = floor(number);
        volume = Remove_decimal/500;
        document.getElementById("volume").innerHTML = "volume = " +volume;
        song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(0.1);
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;


