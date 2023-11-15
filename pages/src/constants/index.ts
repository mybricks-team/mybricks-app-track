export const MySelf_COM_LIB = {
  comAray: [],
  id: '_myself_',
  title: '我的组件',
  defined: true,
};

// 本地组件库的ID，不支持物料中心查询
export const LOCAL_COM_LIB_ID = '';

export const H5_BASIC_COM_LIB = {
  id: LOCAL_COM_LIB_ID,
  namespace: "mybricks.normal-h5-comlib.vue",
  editJs: './public/comlibs/0.0.12/edit.js',
  // editJs: 'https://tx-ec.static.yximgs.com/kos/nlav11092/comlibs/mybricks.normal-h5/202309211729/edit.js',
  rtJs: './public/comlibs/0.0.12/rt.js',
  // rtJs: 'https://tx-ec.static.yximgs.com/kos/nlav11092/comlibs/mybricks.normal-h5/202309211729/rt.js',
  coms: './public/comlibs/0.0.12/rtCom.js',
  version: '0.0.12'
}