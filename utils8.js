export const drawStatusText = function(ctx, input){
  ctx.font = '30px Helvetica'
  ctx.fillStyle = '#fff'
  ctx.fillText(`last input: ${input.lastKey}`, 10, 30)
}