<template>
    <div>
        <canvas :width="canW" :height="canH" style="background-color: transparent" ref="drawPain" id="drawPain"> </canvas>
    </div>
</template>
<script>
export default {
    props: ['canW', 'canH', 'posLineArr', 'checkRoom'],
    data() {
        return {
            positionArr: [],
            posArr: []
        };
    },
    methods: {
        drawPain() {
            let _self = this;
            //监听drawPain元素内的点击事件,并获取鼠标当前位置
            this.$refs.drawPain.addEventListener('click', (e) => {
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
        drawLine() {
            let _self = this;
            var canvas = document.getElementById('drawPain');
            //获得 2d 上下文对象
            var ctx = canvas.getContext('2d');
            for (let i = 0; i < _self.posArr.length; i++) {
                //绘制线
                if (_self.posArr[i + 1]) {
                    ctx.beginPath();
                    ctx.moveTo(_self.posArr[i].x, _self.posArr[i].y);
                    ctx.lineTo(_self.posArr[i + 1].x, _self.posArr[i + 1].y);
                    ctx.closePath();
                    ctx.strokeStyle = 'red';
                    ctx.stroke();
                }
            }
        },
        drawRoomPoint() {
            let _self = this;
            //监听drawPain元素内的点击事件,并获取鼠标当前位置
            this.$refs.drawPain.addEventListener('click', (e) => {
                let x = e.offsetX;
                let y = e.offsetY;
                //在drawPain画布绘制标点
                let canvas = document.getElementById('drawPain');
                //获得 2d 上下文对象
                let ctx = canvas.getContext('2d');
                //清理drawPain画布
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                _self.drawLine();
                //绘制5px三角形
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 20, y);
                ctx.lineTo(x + 20 / 2, y - 20 / 2);
                ctx.closePath();
                ctx.fillStyle = 'red';
                ctx.fill();
                _self.$emit('checkRoomPos', { x: x, y: y });
            });
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
            this.posArr = newPOSaRR;
            this.drawLine();
            if (this.checkRoom) {
                this.drawRoomPoint();
            }
        } else {
            // 划线
            this.drawPain();
        }
    }
};
</script>
<style lang="scss"></style>
