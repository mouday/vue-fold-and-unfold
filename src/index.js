import FoldAndUnfold from "./FoldAndUnfold.vue";

export default FoldAndUnfold;

// 注册组件
export const install = function(Vue, options) {
  Vue.component(FoldAndUnfold.name, FoldAndUnfold);
};

