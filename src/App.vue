<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.addEventListener("focusout", () => {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //软键盘收起的事件处理
        setTimeout(() => {
          const scrollHeight =
            document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      }
    });
  }
};
</script>
