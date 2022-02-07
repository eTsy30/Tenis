function drawBlock() {
    for (let col = 0; col < blockColl; col++) {
        for (let row = 0; row < blockRow; row++) {
            if (block[col][row].status == 1) {
                let blockX = (col * (blockWidth + blockPadding)) + blockMoveLeft;
                let blockY = (row * (bloskHeight + blockPadding)) + blockMoveTop;
                block[col][row].x = blockX;
                block[col][row].y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, bloskHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawShip() {
    ctx.beginPath()
    ctx.rect(sheepStartPosition, canva.height - shipHeight, shipWidth, shipHeight)
    ctx.fillStyle = '#007662'
    ctx.fill()
    ctx.closePath()

}

function ballDraw() {
    ctx.beginPath();
    ctx.arc(x, y, radiusBall, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

}