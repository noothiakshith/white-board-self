export function drawelement(ctx, element) {
  const {
    type, x1, x2, y1, y2, points, text,
    fontsize, storecolor = 'black',
    fillcolor = 'transparent',
    brushsize = 2,
  } = element;

  ctx.lineWidth = brushsize;
  ctx.strokeStyle = storecolor;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (type) {
    case 'pen':
      ctx.beginPath();
      if (points && points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
      break;
  }
}

export function getcoordinates(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
}
