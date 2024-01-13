export const topline = {
id: 'topLine',
afterDatasetsDraw(chart, args, plugins) {
const { ctx, data } = chart;
ctx.save();
// console.log(chart.data.datasets)
// console.log(chart.getDatasetMeta(0).data)
const _dts = chart.data.datasets.length;
for (let i = 0; i < _dts; i++) {
// chart.update()
chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
ctx.beginPath();
ctx.strokeStyle = data.datasets[i].borderColor[index];
ctx.lineWidth = 3;
const halfWidth = datapoint.width / 2;
ctx.moveTo(datapoint.x - halfWidth, datapoint.y - 6);
ctx.lineTo(datapoint.x + halfWidth, datapoint.y - 6);
ctx.stroke();

ctx.font = 'bold 12px sans-serif';
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.fillText(data.datasets[i].data[index], datapoint.x, datapoint.y - 15);
});
}
}
};
