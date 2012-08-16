// the arraylist that holds all the atoms
ArrayList atoms = new ArrayList();

// this function only runs on init
void setup() {
	size(511,511);
	frameRate(30);
	noStroke();
	
	// create 200 atoms
	for(int i = 0; i < 200; i++) {
		atoms.add(new Atom());	
	}
	
}

// this function runs every frame
void draw() {
	background(100);
	
	// loop through all atoms and update() and draw() them
	for(int i = 0; i < atoms.size(); i++) {
		Atom a = (Atom)atoms.get(i);
		a.update();
		a.draw();
	}
}


class Atom {
	// position
	int x, y, xV, yV;
	// filling
	int r, g, b, a;
	// size
	int size, xDiff, yDiff, diff, treshold;
	
	// constructor of the class
	Atom() {
		// create a random color
		r = random(50);
		g = random(255);
		b = random(255);
		
		x = random(width);
		y = random(height);
		
		// maximum distance from atom 
		// to mouse before bubbling
		treshold = width / 4;
		
		xV = random(-2, 2);
		yV = random(-2, 2);
	}

	// this function calcs
	// and sets: x, y, a, size
	void update() {
		
		x += xV;
		y += yV;
		
		// take care of borders right & bottom	
		x %= width;
		y %= height;
		
		// take care of borders left & top
		if(x < 0) {
			x += width;
		}
		if(y < 0) {
			y += height;
		}
		
		// determinse X and Y 
		// distance to mouse
		xDiff = mouseX - x;
		yDiff = mouseY - y;
		
		// if it's close enough
		if(
			xDiff < treshold && 
			xDiff > -treshold && 
			yDiff < treshold && 
			yDiff > -treshold
			) {
			
			// determine distance to mouse
			// a2 + b2 = c2
			int diff = sqrt(sq(xDiff) + sq(yDiff));
			
			// make smaller diff always bigger
			if(diff < 0) {
				diff *= -1;
			}
			
			// make the size bigger
			size = treshold - diff + 20;
			if(size < 20) {
				size = 20;
			}
			
			// set alpha
			a = size * 1.5;
			
			if(a < 50) {
				a = 50;
			}
			
		} else {
			// it's not close enough
			size = 20;
			a = 50;
		}
		
	}
	
	void draw() {
		fill(r, g, b, a);
		ellipse(x, y, size, size);
	}
}