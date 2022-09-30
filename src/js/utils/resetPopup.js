import Vue from 'vue';
/**重置message，防止重复点击重复弹出message弹框 */
let messageInstance = null;
const resetMessage = (options) => {
    //关闭上一个弹窗，继续下一个弹窗
    if (messageInstance) {
        messageInstance.close(); //手动关闭实例，调用它的 close 方法，详细内容请参考Element-ui官方文档。
    }
    messageInstance = Vue.prototype.$message(options);
};
['error', 'success', 'info', 'warning'].forEach((type) => {
    resetMessage[type] = (options) => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return resetMessage(options);
    };
});
export const Message = resetMessage;
/**重置Notify，防止重复点击重复弹出Notify弹框 */
let notifyInstance = null;
const resetNotify = (options) => {
    //关闭上一个弹窗，继续下一个弹窗
    if (notifyInstance) {
        notifyInstance.close(); //手动关闭实例，调用它的 close 方法，详细内容请参考Element-ui官方文档。
    }
    notifyInstance = Vue.prototype.$notify(options);
};
['error', 'success', 'info', 'warning'].forEach((type) => {
    resetNotify[type] = (options) => {
        if (typeof options === 'string') {
            options = {
                title: options
            };
        }
        options.type = type;
        return resetNotify(options);
    };
});
export const Notify = resetNotify;
