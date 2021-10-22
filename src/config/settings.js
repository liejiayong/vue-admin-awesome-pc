/**
 * @description 通用配置|主题配置|网络配置导出
 */
import setting from './setting.config';
import theme from './theme.config';
import network from './net.config';
import db from './db';

const CONFIG = Object.assign({}, setting, theme, network, db);

export { setting, theme, network, db };

// console.log('settings', CONFIG);

export default Object.freeze(CONFIG);
