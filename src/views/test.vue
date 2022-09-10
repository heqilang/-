<template>
    <div>
        <canvas width="600" height="600" style="background-color: skyblue" ref="drawPain" id="drawPain"> </canvas>
    </div>
</template>
<script>
export default {
    data() {
        return {
            positionArr: []
        };
    },
    methods: {
        drawPain() {
            let _self = this;
            //监听drawPain元素内的点击事件,并获取鼠标当前位置
            this.$refs.drawPain.addEventListener('click', (e) => {
                let lengthPin = 600;
                let x = e.offsetX;
                let y = e.offsetY;
                let position = {
                    x: x,
                    y: y
                };
                position.x = position.x.toFixed(4);
                position.y = position.y.toFixed(4);
                // _self.positionArr = [];
                _self.positionArr.push(position);
                console.log(_self.positionArr);
                //在id为drawPain中创建画布
                var canvas = document.getElementById('drawPain');
                //获得 2d 上下文对象
                var ctx = canvas.getContext('2d');
                //在x:30,y:30处绘制圆点

                switch (_self.positionArr.length) {
                    case 1:
                        console.log(_self.positionArr);
                        // 在画布上坐标30,30处绘制一个3px圆点
                        ctx.beginPath();
                        ctx.arc(_self.positionArr[0].x, _self.positionArr[0].y, 1, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = 'red';
                        ctx.fill();
                        break;
                    case 2:
                        console.log(_self.positionArr);
                        // 在画布上坐标30,30，到60,60处绘制一个3px线段
                        ctx.beginPath();
                        ctx.moveTo(_self.positionArr[0].x, _self.positionArr[0].y);
                        ctx.lineTo(_self.positionArr[1].x, _self.positionArr[1].y);
                        ctx.closePath();
                        ctx.strokeStyle = 'red';
                        ctx.stroke();
                        break;
                    case 3:
                        if (_self.positionArr[2].x - _self.positionArr[0].x < 0.01 && _self.positionArr[2].y - _self.positionArr[0].y < 0.01) {
                            //清理画布
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            //填充阴影色
                            ctx.beginPath();
                            ctx.moveTo(_self.positionArr[0].x, _self.positionArr[0].y);
                            ctx.lineTo(_self.positionArr[1].x, _self.positionArr[1].y);
                            ctx.lineTo(_self.positionArr[2].x, _self.positionArr[2].y);
                            ctx.closePath();
                            ctx.fillStyle = 'rgba(0,0,0,0.5)';
                            ctx.fill();
                        } else {
                            ctx.beginPath();
                            ctx.moveTo(_self.positionArr[1].x, _self.positionArr[1].y);
                            ctx.lineTo(_self.positionArr[2].x, _self.positionArr[2].y);
                            ctx.closePath();
                            ctx.strokeStyle = 'red';
                            ctx.stroke();
                        }
                        break;
                    case 4:
                        if (_self.positionArr[3].x - _self.positionArr[0].x < 0.01 && _self.positionArr[3].y - _self.positionArr[0].y < 0.01) {
                            console.log('pxpx111');
                            //清理画布
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            //填充阴影色
                            ctx.beginPath();
                            ctx.moveTo(_self.positionArr[0].x, _self.positionArr[0].y);
                            ctx.lineTo(_self.positionArr[1].x, _self.positionArr[1].y);
                            ctx.lineTo(_self.positionArr[2].x, _self.positionArr[2].y);
                            ctx.lineTo(_self.positionArr[3].x, _self.positionArr[3].y);
                            ctx.closePath();
                            ctx.fillStyle = 'rgba(216, 30, 30,.68)';
                            ctx.fill();
                        } else {
                            ctx.beginPath();
                            ctx.moveTo(_self.positionArr[2].x, _self.positionArr[2].y);
                            ctx.lineTo(_self.positionArr[3].x, _self.positionArr[3].y);
                            ctx.closePath();
                            ctx.strokeStyle = 'red';
                            ctx.stroke();
                        }

                        break;
                    case 5:
                        console.log(_self.positionArr);
                        // 在画布上坐标30,30，到60,60处绘制一个3px线段
                        ctx.beginPath();
                        ctx.moveTo(_self.positionArr[3].x, _self.positionArr[3].y);
                        ctx.lineTo(_self.positionArr[4].x, _self.positionArr[4].y);
                        ctx.closePath();
                        ctx.strokeStyle = 'red';
                        ctx.stroke();
                        break;
                    default:
                        break;
                }
            });
        },
        drawLine() {
            var c = document.getElementById('my');
            my.width = 1000;
            my.height = 700;
            var ctx = c.getContext('2d');

            c.onmousedown = function (e) {
                var e = e || event;
                var ox = e.clientX - c.offsetLeft;
                var oy = e.clientY - c.offsetTop;
                ctx.moveTo(ox, oy);

                document.onmousemove = function (e) {
                    var ox2 = e.clientX - c.offsetLeft;
                    var oy2 = e.clientY - c.offsetTop;
                    ctx.lineTo(ox2, oy2);
                    ctx.stroke();
                };

                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    },
    created() {},
    mounted() {
        this.drawPain();
        // this.drawLine();
    }
};
</script>
<style lang="scss">
.drawPain {
}
</style>
