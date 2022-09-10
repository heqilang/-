<template>
    <div>
        <canvas :width="canW" :height="canH" style="background-color: transparent" ref="drawPain" id="drawPain"> </canvas>
    </div>
</template>
<script>
export default {
    props: ['canW', 'canH', 'posLineArr'],
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
                if (_self.positionArr.length < 5) {
                    _self.positionArr.push(position);
                }
                console.log(_self.positionArr);
                //在id为drawPain中创建画布
                var canvas = document.getElementById('drawPain');
                //获得 2d 上下文对象
                var ctx = canvas.getContext('2d');
                //在x:30,y:30处绘制圆点

                switch (_self.positionArr.length) {
                    case 1:
                        // 在画布上坐标30,30处绘制一个3px圆点
                        ctx.beginPath();
                        ctx.arc(_self.positionArr[0].x, _self.positionArr[0].y, 1, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fillStyle = 'red';
                        ctx.fill();
                        break;
                    case 2:
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
                this.$emit('drawPoint', _self.positionArr);
            });
        },
        drawLine(posArr) {
            var canvas = document.getElementById('drawPain');
            //获得 2d 上下文对象
            var ctx = canvas.getContext('2d');
            for (let i = 0; i < 4; i++) {
                //绘制线
                ctx.beginPath();
                ctx.moveTo(posArr[i].x, posArr[i].y);
                ctx.lineTo(posArr[i + 1].x, posArr[i + 1].y);
                ctx.closePath();
                ctx.strokeStyle = 'red';
                ctx.stroke();

                // if (posArr[i + 1].x) {
                //     ctx.beginPath();
                //     ctx.moveTo(posArr[i].x, posArr[i].y);

                //     ctx.lineTo(posArr[i + 1].x, posArr[i + 1].y);
                //     ctx.closePath();
                //     ctx.strokeStyle = 'red';
                //     ctx.stroke();
                // }
            }
            // ctx.beginPath();
            // ctx.moveTo(_self.positionArr[0].x, _self.positionArr[0].y);
            // ctx.lineTo(_self.positionArr[1].x, _self.positionArr[1].y);
            // ctx.closePath();
            // ctx.strokeStyle = 'red';
            // ctx.stroke();
        }
    },
    created() {},
    mounted() {
        if (this.posLineArr) {
            //展示线
            let cposLineArr = this.posLineArr.split(';');
            let newPOSaRR = [];
            for (let i = 0; i < cposLineArr.length; i++) {
                let arxy = cposLineArr[i].split(',');
                newPOSaRR.push({
                    x: arxy[0],
                    y: arxy[1]
                });
            }
            console.log(newPOSaRR);
            this.drawLine(newPOSaRR);
        } else {
            // 划线
            this.drawPain();
        }
    }
};
</script>
<style lang="scss"></style>
