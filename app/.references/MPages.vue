<template>
  <section id="container" oncontextmenu="return false;">
    <div class="page">
      <img :src="`${fullURL}${baseURL}files/brochure/${pageNum}.webp`" />
      <a v-if="pageNum in ads" :href="ads[pageNum].href" :style="{ top: `${ads[pageNum].top}%`, height: `calc(${ads[pageNum].height}% - 6px)` }" target="_blank" rel="noopener noreferrer"></a>
    </div>
    <div v-show="isDouble && pageNum > 1 && pageNum < numPages" class="page">
      <img :src="`${fullURL}${baseURL}files/brochure/${pageNum + 1}.webp`" />
      <a v-if="pageNum + 1 in ads" :href="ads[pageNum + 1].href" :style="{ top: `${ads[pageNum + 1].top}%`, height: `calc(${ads[pageNum + 1].height}% - 6px)` }" target="_blank" rel="noopener noreferrer"></a>
    </div>
  </section>
</template>

<script setup lang="ts">
  import ads from "~/assets/data/brochure/ads.json";

  const baseURL = useRuntimeConfig().public.baseURL;
  const fullURL = useRuntimeConfig().public.fullURL;

  const props = defineProps<{ pageNum: number }>();
  const pageNum = ref<number>(props.pageNum);
  const numPages = useState<number>("brochure_numPages");
  const scaleNum = useState<number>("brochure_scaleNum");
  const isDouble = useState<boolean>("brochure_isDouble");

  watch(
    () => props.pageNum,
    (newVal) => {
      pageNum.value = newVal;
    }
  );

  function adjustPageSizes() {
    const imgs = document.getElementsByClassName("page");
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i] as HTMLImageElement;
      img.style.transform = `scale(${scaleNum.value / 100})`;
      if (isDouble.value) {
        if (i === 0) {
          img.style.transformOrigin = "100% 50%";
        } else {
          img.style.transformOrigin = "0% 50%";
        }
      } else {
        img.style.transformOrigin = "center";
      }
    }
    const content = document.getElementById("container");
    if (content) {
      content.style.height = `calc(${scaleNum.value}% - 30px)`;
      content.style.width = `calc(${((Number(content.clientHeight) * 875) / 1241) * (isDouble.value ? 2 : 1)}px)`;
    }
  }

  watch(scaleNum, () => {
    adjustPageSizes();
  });

  watch(isDouble, () => {
    const imgs = document.getElementsByClassName("page");
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i] as HTMLImageElement;
      img.style.maxWidth = `${isDouble.value ? 50 : 100}%`;
    }
    adjustPageSizes();
  });
</script>

<style scoped lang="scss">
  #container {
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    margin: auto;
    padding: 15px;
    overflow: visible;
    color: $text2_white;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    .page {
      position: relative;
      height: fit-content;
      max-height: 90vh;

      img {
        max-width: 100%;
        max-height: 85vh;

        aspect-ratio: 875/1241;
        object-fit: contain;
      }

      a {
        position: absolute;
        left: 0;
        width: 100%;
        // background-color: rgba(yellow, 0.6);
      }
    }

    .dummy {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 25px;
      background-color: gray;
    }
  }
</style>