<template>
  <div id="wrapper">
    <brochure-m-index />
    <section class="switches">
      <div class="only-pc hidden-on-tab-and-sp">
        <div class="button scale" :style="scaleNumInput === 100 ? { opacity: '0.5', cursor: 'default' } : {}" @click="decrementScale">ー</div>
        <p><input id="scale-num" v-model="scaleNumInput" type="number" min="100" step="25" max="300" /> %</p>
        <div class="button scale" :style="scaleNumInput === 300 ? { opacity: '0.5', cursor: 'default' } : {}" @click="incrementScale">＋</div>
      </div>
      <div>
        <div class="button" :style="pageNumInput === 1 ? { opacity: '0.5', cursor: 'default' } : {}" @click="decrementPage"><img src="~/assets/images/header/arrow.svg" alt="" :style="{ transform: 'rotate(180deg)' }" /></div>
        <p><input id="page-num" v-model="pageNumInput" type="number" min="1" step="1" :max="numPages" /> / {{ numPages }}</p>
        <div class="button" :style="pageNumInput === 116 ? { opacity: '0.5', cursor: 'default' } : {}" @click="incrementPage"><img src="~/assets/images/header/arrow.svg" alt="" /></div>
      </div>
      <div class="only-pc hidden-on-tab-and-sp">
        <a-link class="button" :link="`${fullURL}${baseURL}files/brochure/第97回五月祭公式パンフレット.pdf`">
          <img class="download" src="~/assets/images/brochure/download.svg" alt="download" />
        </a-link>
      </div>
      <div class="double" @click="switchDouble()">
        <p v-if="isDouble"><span>見開き</span> / 単一</p>
        <p v-else>見開き / <span>単一</span></p>
      </div>
    </section>
    <section v-if="1 <= pageNum && pageNum <= numPages" id="contents">
      <div class="to left" @click="decrementPage()"></div>
      <brochure-m-pages :pageNum="pageNum" />
      <div class="to right" @click="incrementPage()"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import PinchZoom from "pinch-zoom-js";
  import { useI18n } from "vue-i18n";
  const { t } = useI18n();
  useHead(() => {
    return {
      title: t("brochure.title"),
    };
  });

  definePageMeta({ layout: "brochure" });

  // pagination
  const pageNum = useState<number>("brochure_pageNum", () => 1);
  const pageNumInput = ref(pageNum.value);
  const numPages = useState<number>("brochure_numPages", () => 116);
  const isDouble = useState<boolean>("brochure_isDouble", () => false);
  const lastChangePageTime = ref(0);
  function incrementPage() {
    if (Date.now() - lastChangePageTime.value < 200) return;
    if (isDouble.value) {
      if (pageNum.value === 1) pageNum.value = 2;
      else pageNum.value += 2;
    } else {
      ++pageNum.value;
    }
    lastChangePageTime.value = Date.now();
  }
  function decrementPage() {
    if (Date.now() - lastChangePageTime.value < 200) return;
    if (isDouble.value) {
      if (pageNum.value === 2) pageNum.value = 1;
      else pageNum.value -= 2;
    } else {
      --pageNum.value;
    }
    lastChangePageTime.value = Date.now();
  }
  function switchDouble() {
    if (!isDouble.value && pageNum.value % 2 === 1) decrementPage();
    isDouble.value = !isDouble.value;
  }
  watch(pageNum, () => {
    if (isDouble.value && pageNum.value > 1 && pageNum.value % 2 === 1) pageNum.value--;
    if (pageNum.value < 1) {
      pageNum.value = 1;
    }
    if (pageNum.value > numPages.value) {
      pageNum.value = numPages.value;
    }
    pageNumInput.value = pageNum.value;
  });

  // scaling
  const scaleNum = useState("brochure_scaleNum", () => 100);
  const scaleNumInput = ref(scaleNum.value);
  function incrementScale() {
    scaleNum.value += 25;
  }
  function decrementScale() {
    scaleNum.value -= 25;
  }
  watch(scaleNum, () => {
    if (scaleNum.value < 100) scaleNum.value = 100;
    if (scaleNum.value > 300) scaleNum.value = 300;
    scaleNumInput.value = scaleNum.value;
  });

  const minimumDistance = 30; // breakpoint of swiping
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let isDragging = false;
  onMounted(() => {
    document.getElementById("page-num")!.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        pageNum.value = pageNumInput.value;
      }
    });
    document.getElementById("scale-num")!.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        scaleNum.value = scaleNumInput.value;
      }
    });

    const el = document.querySelector("#contents") as HTMLElement;

    // config for touch devices
    if (window.ontouchstart !== undefined && navigator.maxTouchPoints > 0) {
      // pinch & zoom
      const pz = new PinchZoom(el, {
        minZoom: 1,
        maxZoom: 3,
        draggableUnzoomed: false,
        onDragStart: () => {
          isDragging = true;
        },
        onDragEnd: () => {
          isDragging = false;
        },
      });

      // swipe
      el.addEventListener("touchstart", (e) => {
        if (isDragging) return;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        endX = startX;
        endY = startY;
      });
      el.addEventListener("touchmove", (e) => {
        if (isDragging) return;
        endX = e.changedTouches[0].pageX;
        endY = e.changedTouches[0].pageY;
      });
      el.addEventListener("touchend", () => {
        const distanceX = Math.abs(endX - startX);
        const distanceY = Math.abs(endY - startY);
        if (distanceX > distanceY && distanceX > minimumDistance && !isDragging) {
          if (endX - startX > 0) decrementPage();
          else incrementPage();
        }
        endX = startX;
        endY = startY;
      });
    }

    // config for non-touch devices
    else {
      // drag
      let target: any;
      el.addEventListener("mousedown", function (evt: any) {
        evt.preventDefault();
        target = el;
        target.dataset.down = "true";
        target.dataset.move = "false";
        target.dataset.x = evt.clientX;
        target.dataset.y = evt.clientY;
        target.dataset.scrollleft = target.scrollLeft;
        target.dataset.scrolltop = target.scrollTop;
        evt.stopPropagation();
      });
      el.addEventListener("click", function (evt: any) {
        if (el.dataset != null && el.dataset.move === "true") evt.stopPropagation();
      });
      document.addEventListener("mousemove", function (evt) {
        if (target != null && target.dataset.down === "true") {
          evt.preventDefault();
          const moveX = parseInt(target.dataset.x) - evt.clientX;
          const moveY = parseInt(target.dataset.y) - evt.clientY;
          if (moveX !== 0 || moveY !== 0) {
            target.dataset.move = "true";
          } else {
            return;
          }
          target.scrollLeft = parseInt(target.dataset.scrollleft) + moveX;
          target.scrollTop = parseInt(target.dataset.scrolltop) + moveY;
          evt.stopPropagation();
        }
      });
      document.addEventListener("mouseup", function (evt) {
        if (target != null && target.dataset.down === "true") {
          target.dataset.down = "false";
          evt.stopPropagation();
        }
      });

      // scroll
      el.onwheel = (e) => {
        const isMouse = Math.abs(e.deltaX) === 0 && Math.ceil(e.deltaY) !== e.deltaY;
        if (isMouse) {
          if (e.deltaY < 0) {
            decrementPage();
          }
          if (e.deltaY > 0) {
            incrementPage();
          }
        } else {
          if (e.deltaX < -8) {
            decrementPage();
          }
          if (e.deltaX > 8) {
            incrementPage();
          }
        }
      };
      const disableScroll = (event: any) => {
        event.preventDefault();
      };
      window.addEventListener("touchmove", disableScroll, { passive: false });
      window.addEventListener("mousewheel", disableScroll, { passive: false });

      // keyboard
      window.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft") {
          decrementPage();
        }
        if (e.key === "ArrowRight") {
          incrementPage();
        }
        if (e.key === "ArrowUp") {
          incrementScale();
        }
        if (e.key === "ArrowDown") {
          decrementScale();
        }
      });
    }
  });

  const baseURL = useRuntimeConfig().public.baseURL;
  const fullURL = useRuntimeConfig().public.fullURL;
</script>

<style scoped lang="scss">
  $header-height: 3rem;

  #wrapper {
    position: relative;
    width: 100vw;
    height: calc(100svh - $header-height);
    overflow: visible;

    touch-action: none;
    overscroll-behavior: none;

    .switches {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $header-height;
      // background-color: rgba(#ffffff, 0.5);
      user-select: none;

      @include notpc {
        position: fixed;
        bottom: 18px;
        left: 0;
        z-index: 97;
        width: 100%;
      }

      > div {
        display: flex;
        align-items: center;

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 1em;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          .download {
            width: 2.2em;
            height: 2.2em;
          }
        }

        .scale {
          color: $text3_gray;
          font-weight: 500;
          font-size: 1.5rem;
        }

        p {
          margin: 0;
          font-size: 1.2rem;
          text-align: center;

          input {
            width: 3em;
            font-size: 1.2rem;
            text-align: end;
          }

          span {
            font-weight: 500;
            text-decoration: underline;
          }
        }
      }

      .double {
        margin-left: 1em;
        cursor: pointer;
      }

      @media (hover: none) {
        .only-pc {
          display: none;
        }
      }
    }

    #contents {
      height: 100%;
      @media (hover: none) {
        width: max-content;
        min-width: 100%;
        overflow: hidden;
      }
      @media (hover: hover) {
        width: 100%;
        overflow: scroll;
      }

      .to {
        position: fixed;
        top: 0;
        z-index: 10;
        height: 100lvh;
        cursor: pointer;

        @media (hover: none) {
          width: 20%;
          &:active {
            background-color: rgba($sub1_soft, 0.5);
          }
        }
        @media (hover: hover) {
          width: 15%;
          &:hover {
            background-color: rgba($sub1_soft, 0.5);
          }
        }
      }

      .left {
        left: 0;
      }

      .right {
        right: 0;
      }
    }
  }
</style>