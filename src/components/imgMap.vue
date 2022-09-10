<template>
    <div class="drag">
        <div v-drag class="content" :style="{ transform: 'scale(' + multiples + ')' + 'rotate(' + current + 'deg)' }" @mousewheel.prevent="rollImg" ref="conMx" style="width: 100%; z-index: 20">
            <img v-on:dblclick="chickPosition" id="target" ref="element" class="target" style="width: 100%" :src="imgSrc" />
            <i :style="'left:' + iconPosition.x + '%;top:' + iconPosition.y + '%;opacity:' + iconPosition.opacity + ';transform: scale(' + 1 / multiples + ');!important'" class="el-icon-location posIcon"></i>
        </div>
        <div v-if="showEquipPop" class="equipPop">
            <div style="text-align: center">
                <span :class="[_comm.getStatusClass(checkEquipInfo.equipmentState)]">
                    {{ _comm.getEuipmentNameByCode(checkEquipInfo.equipmentState) }}
                </span>

                <span v-if="checkEquipInfo.alarmType"> ({{ _comm.getAlarmTypeByCode(scope.row.alarmType) || '--' }})</span>
            </div>
            <div>设备名称：{{ checkEquipInfo.equipmentName }}</div>
            <div>安装位置：{{ checkEquipInfo.lookup.building + checkEquipInfo.lookup.floor }}</div>
            <div>二维码ID：{{ checkEquipInfo.qr }}</div>
            <div>上传时间：{{ checkEquipInfo.lastUpdatetime }}</div>
            <!-- <div style="height: 50px; line-height: 50px; text-align: center">
                <el-button @click="goEquipPages" class="btn-search w100 mar-r-18" type="primary">详情</el-button>
            </div> -->
            <div class="closeIconFF">
                <i @click="showEquipPop = false" style="font-size: 22px; cursor: pointer" class="el-icon-circle-close"></i>
            </div>
        </div>
        <!-- <div class="button">
            <el-button size="mini" type="success" @click="handlerotate">旋转</el-button>
            <el-button size="mini" type="success" @click="handlebig">放大</el-button>
            <el-button size="mini" type="success" @click="handleReduce">缩小</el-button>
        </div> -->
        <el-button v-if="isChecked" class="btn-search handelSubmitBtn" size="mini" type="primary" @click="selectPoint">确定</el-button>
    </div>
</template>
<script>
export default {
    directives: {
        drag(el) {
            const oDiv = el;
            oDiv.onmousedown = function (e) {
                const disX = e.clientX - oDiv.offsetLeft;
                const disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = function (e) {
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            };
        }
    },
    props: {
        //标点图片的地址
        imgSrc: {
            type: String,
            default: null
        },
        //是否是选点还是预览
        isChecked: {
            type: Boolean,
            default: false
        },
        //标点位置
        posXY: {
            type: Object,
            default: null
        },
        posXYList: {
            type: Array,
            default: null
        },
        floorId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            iconPosition: {
                x: 0,
                y: 0,
                opacity: 0
            },
            current: 0,
            src: 'https://axure-file.lanhuapp.com/39ea7541-bfe5-4190-b100-242cd35fc4f0__ca96ea18d5441d8e2ed4a5642d71b154.png',
            multiples: 1,
            showEquipPop: false,
            checkEquipInfo: ''
        };
    },
    watch: {
        floorId(val) {
            console.log(val);
            this.getMarkList();
        }
    },
    methods: {
        goEquipPages() {
            switch (this.checkEquipInfo.owningSystem) {
                case 'euipType1':
                    this.$router.push({
                        path: '/equipManaList/1'
                    });
                    break;
                case 'euipType2':
                    this.$router.push({
                        path: '/equipManaList/2'
                    });
                    break;
                case 'euipType3':
                    this.$router.push({
                        path: '/equipManaList/3'
                    });
                    break;
                case 'euipType4':
                    this.$router.push({
                        path: '/equipManaList/4'
                    });
                    break;

                default:
                    break;
            }
        },
        selectPoint() {
            this.$emit('selectPoint', this.iconPosition);
        },
        // 获取双击处的百分比位置,并处理因放大缩小图片标点偏移问题
        chickPosition(e) {
            if (!this.isChecked) {
                return false;
            }
            const x = e.offsetX / this.$refs.element.offsetWidth;
            const y = e.offsetY / this.$refs.element.offsetHeight;
            this.iconPosition.x = x * 100 - 0.8;
            this.iconPosition.y = y * 100 - 1.8;
            this.iconPosition.opacity = 1;
        },
        rollImg(e) {
            console.log(e);
            if (e.deltaY > 0) {
                if (this.multiples > 0.2) {
                    this.multiples = Number(this.multiples) - 0.1;
                }
            } else {
                this.multiples = Number(this.multiples) + 0.1;
            }
            const posIcon = document.getElementsByClassName('posIcon');
            for (let i = 0; i < posIcon.length; i++) {
                posIcon[i].style.transform = 'scale(' + 1 / this.multiples + ')';
            }
        },
        handlerotate() {
            this.current = (this.current + 90) % 360;
        },
        handlebig() {
            this.multiples = Number(this.multiples) + 0.1;
            const posIcon = document.getElementsByClassName('posIcon');
            for (let i = 0; i < posIcon.length; i++) {
                console.log(posIcon[i]);
                posIcon[i].style.transform = 'scale(' + 1 / this.multiples + ')';
            }
        },
        handleReduce() {
            this.multiples = Number(this.multiples) - 0.1;
            // posIcon
            // 获取class为posIcon的元素，并缩小0.5
            const posIcon = document.getElementsByClassName('posIcon');
            for (let i = 0; i < posIcon.length; i++) {
                posIcon[i].style.transform = 'scale(' + 1 / this.multiples + ')';
            }
        },
        getMarkList() {
            // /api/web/webEquipment/find
            let _self = this;
            //删除_self.$refs.conMx下i标签
            let iList = this.$refs.conMx.getElementsByTagName('i');
            for (let i = 0; i < iList.length; i++) {
                this.$refs.conMx.removeChild(iList[i]);
            }
            let searchs = {
                floor: _self.floorId,
                current: 1,
                size: 3000
            };
            searchs['planeLocation.symbol'] = 'IS_NOT_NULL';
            searchs['planeLocation'] = '';
            _self._http({
                url: '/api/web/webEquipment/find',
                type: 'get',
                data: searchs,
                success: function (res) {
                    // planeLocation
                    // let arr = [];
                    for (let j = 0; j < res.data.records.length; j++) {
                        // arr.push({
                        //     x: res.data.records[i].planeLocation.split(',')[0],
                        //     y: res.data.records[i].planeLocation.split(',')[1]
                        // });
                        //创建i，并设置默认class为el-icon-location posIcon
                        if (res.data.records[j].planeLocation != null) {
                            let posArr = res.data.records[j].planeLocation.split(',');
                            let i = document.createElement('i');
                            i.className = 'el-icon-location posIcon color-' + (res.data.records[j].equipmentState || 3);
                            //设置i的位置
                            i.style.left = posArr[0] + '%';
                            i.style.top = posArr[1] + '%';
                            i.style.opacity = 1;
                            // 设置之定义属性data-id
                            i.setAttribute('data-id', res.data.records[j].id);
                            // 设置点击事件
                            i.onclick = function (e) {
                                _self.getEquipInfo(e.target.dataset.id);
                            };
                            //插入到目标元素中
                            _self.$refs.conMx.appendChild(i);
                        }
                    }
                }
            });
        },
        getEquipInfo(id) {
            console.log(id);
            let _self = this;
            _self._http({
                url: '/api/web/webEquipment/find',
                type: 'get',
                data: {
                    id: id,
                    current: 1,
                    size: 999,
                    transform: 'B:building,F:floor'
                },
                success: function (res) {
                    _self.checkEquipInfo = res.data.records[0];
                    _self.showEquipPop = true;
                }
            });
            // /api/web/webEquipment/find
        }
    },
    mounted() {
        this.$nextTick(function () {
            // 监听当前组件的滚动事件
            this.box = this.$refs.element;
            this.box.addEventListener(
                'scroll',
                () => {
                    if (this.$refs.viewBox.scrollTop > 0) {
                        console.log(1);
                    }
                },
                false
            );
            if (!this.isChecked) {
                if (this.floorId) {
                    this.getMarkList();
                } else {
                    if (this.posXY) {
                        this.iconPosition.opacity = 1;
                    } else {
                        this.iconPosition.opacity = 0;
                    }
                    this.iconPosition.x = this.posXY.x;
                    this.iconPosition.y = this.posXY.y;
                }
            } else {
                this.iconPosition.opacity = 0;
            }
        });
    }
};
</script>
<style lang="scss">
.posIcon {
    color: red;
    font-size: 18px;
    position: absolute;
}
.drag {
    position: relative;
    height: 100%;
    min-height: 600px;
    .equipPop {
        position: absolute;
        z-index: 999;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
        width: 280px;
        // height: 280px;
        border-radius: 6px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
        line-height: 28px;
        //阴影
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        .closeIconFF {
            position: absolute;
            right: 10px;
            top: 10px;
            color: #000;
        }
    }
}
.content {
    position: absolute;
    /* transform: translate(-50%, -50%); */
    left: 0;
    top: 0;
    cursor: pointer;
}
.target {
    text-align: center;
    display: inline-block;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    background: #eeff99;
}
.button {
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 95%;
    z-index: 200;
}
.handelSubmitBtn {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}
.color-9 {
    color: #ed4545;
}
.color-4 {
    color: #f3cc41;
}
.color-2 {
    color: #fb7a31;
}
.color-3 {
    color: #aa9d9b;
}
.color-1 {
    color: #72e260;
}
</style>
