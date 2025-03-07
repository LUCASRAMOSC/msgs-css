let highestZ = 1;

class Paper {
    holdingPaper = false;
    rotating = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        // Adiciona suporte a mouse e toque
        const startEvent = (e) => {
            let clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            this.mouseTouchX = clientX;
            this.mouseTouchY = clientY;
            this.prevMouseX = clientX;
            this.prevMouseY = clientY;

            // Se for toque longo (pressionar e segurar), ativa rotação
            if (e.type === "touchstart") {
                this.touchTimeout = setTimeout(() => {
                    this.rotating = true;
                }, 300);
            }
        };

        const moveEvent = (e) => {
            if (!this.holdingPaper) return;
            let clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            this.velX = clientX - this.prevMouseX;
            this.velY = clientY - this.prevMouseY;

            if (!this.rotating) {
                this.currentPaperX += this.velX;
                this.currentPaperY += this.velY;
            }

            this.prevMouseX = clientX;
            this.prevMouseY = clientY;

            paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
        };

        const endEvent = () => {
            this.holdingPaper = false;
            this.rotating = false;
            clearTimeout(this.touchTimeout);
        };

        // Adiciona eventos para mouse e toque
        paper.addEventListener("mousedown", startEvent);
        paper.addEventListener("touchstart", startEvent);
        document.addEventListener("mousemove", moveEvent);
        document.addEventListener("touchmove", moveEvent);
        window.addEventListener("mouseup", endEvent);
        window.addEventListener("touchend", endEvent);
    }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});
