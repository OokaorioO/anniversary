var line_num;
var box_num;
var px, py, pz;
var eyesetx;
var eyesety;
var eyesetz;
var camsetx;
var camsety;
var camsetz;
var targetx;
var targety;
var targetz;
var offsetx;
var offsety;
var offsetz;
var stx, sty, stz;
var enx, eny, enz;
var lines = [];
var boxes = [];
function setup() {
    pixelDensity(displayDensity());
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(RGB, 256);
    background(0);
    line_num = 500;
    box_num = 520;
    eyesetx = width / 2.0;
    eyesety = height / 2.0;
    eyesetz = 0.0;
    camsetx = width / 2.0;
    camsety = height / 2.0;
    camsetz = 0.0;
    offsetx = width / 2.0;
    offsety = height / 2.0;
    offsetz = 0.0;
    translate(offsetx, offsety, offsetz);
    px = 0.0
    py = 0.0;
    pz = 0.0;
}
function draw() {
    background(0);
    ambientLight(102, 102, 102);
    directionalLight(102, 102, 102, 0, 0, -1);
    pz -= 120.0;
    lines.push(new LineObject(px, py, pz));
    if (lines.length > line_num) {
        lines = subset(lines, lines.length - (line_num - 1), line_num);
    }
    if (lines.length > 180) {
        targetx = (mouseX - offsetx) * 1.6;
        targety = (mouseY - offsety) * 1.6;
        eyesetx += (targetx - eyesetx) * 0.062;
        eyesety += (targety - eyesety) * 0.062;
        eyesetz = lines[lines.length - 160].pz;
        camsetx += (targetx - camsetx) * 0.064;
        camsety += (targety - camsety) * 0.064;
        camsetz = eyesetz - 10.0;
        camera(eyesetx, eyesety, eyesetz,
            camsetx, camsety, camsetz,
            0.0, 1.0, 0.0);
        for (var i = 0; i < lines.length - 1; i++) {
            if (i > 0) {
                stroke(100);
                strokeWeight(1);
                noFill();
                stx = lines[i].px;
                sty = lines[i].py;
                stz = lines[i].pz;
                enx = lines[i - 1].px;
                eny = lines[i - 1].py;
                enz = lines[i - 1].pz;
				/*
				beginShape ();
				vertex (stx - 100, sty, stz);
				vertex (enx - 100, eny, enz);
				vertex (enx + 100, eny, enz);
				vertex (stx + 100, sty, stz);
				endShape ();
				*/

                //  box (enx, eny);
            }
        }
        for (var i = 0; i < 3; i++) {
            var c = color(random(256), random(256), random(256));
            boxes.push(new BoxObject(px + random(-600, 600), py + random(-600, 600), pz, 0, random(10, 100), random(10, 100), random(10, 100), c));
        }
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].render();
        }
        if (boxes.length > box_num) {
            for (var i = 0; i < 3; i++) {
                boxes = subset(boxes, boxes.length - (box_num - 1), box_num);
            }
        }
    }

}
function LineObject(ipx, ipy, ipz) {
    this.px = ipx;
    this.py = ipy;
    this.pz = ipz;
}
function BoxObject(x, y, z, a, sx, sy, sz, c) {
    var alpha = a;
    var box_sizex = sx;
    var box_sizey = sy;
    var box_sizez = sz;
    var box_locx = x;
    var box_locy = y;
    var box_locz = z;
    var col = c;
    this.render = function () {
        alpha += 3.2;
        fill(col, alpha * 1.8);
        //noStroke();
        stroke(.5)
        push();
        translate(box_locx, box_locy, box_locz);
        box(tan(box_sizex) * 50, tan(box_sizey) * 4, tan(box_sizez) * 90);
        rotateX(mouseX);
        rotateZ(mouseY);
        pop();
    }
}