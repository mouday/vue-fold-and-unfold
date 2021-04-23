<template>
  <div
    class="fold-and-unfold"
    ref="container"
    :style="{height: !active_? `${height}px` : ''}"
    :class="{'overflow-hidden': !active_}"
  >
    <!-- 内容区域 -->
    <div
      class="fold-and-unfold-content"
      ref="content"
    >
      <slot></slot>
    </div>

    <!-- 按钮区域 -->
    <div
      class="fold-and-unfold-button"
      @click="handleActiveClick"
      v-show="showButton"
    >
      <!-- 展开时的状态 -->
      <slot
        name="active"
        v-if="active_"
      >
        <span class="active">收起</span>
      </slot>
      <!-- 隐藏时的状态 -->
      <slot
        name="inactive"
        v-else
      >
        <span class="inactive">展开</span>
      </slot>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FoldAndUnfold',

  props: {
    // 展开： true, 收起： false
    active: { type: Boolean, default: false },
    // 高度
    height: { type: Number, default: Infinity },
  },

  components: {},

  data() {
    return {
      showButton: false,
    };
  },

  computed: {
    active_: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit('update:active', val);
      },
    },

    /**
     * 获取内部容器高度
     */
    contentHeight() {
      if (this.$refs.content) {
        return this.$refs.content.clientHeight;
      } else {
        return 0;
      }
    },
  },

  methods: {
    handleActiveClick() {
      this.active_ = !this.active_;
    },

    handleWindowResize() {
      //   console.log(this.contentHeight, this.containerHeight);
      if (this.contentHeight > this.height) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  },

  mounted() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
};
</script>

<style>
.fold-and-unfold {
  display: flex;
  justify-items: center;
}

.fold-and-unfold-content {
  height: fit-content;
}

.overflow-hidden {
  overflow: hidden;
}
</style>