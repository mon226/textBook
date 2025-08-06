<template>
  <div class="visitors-background-top-left index-background">
    <div class="blur-circle"></div>
    <div class="border-circle hidden-on-tab-and-sp"></div>
  </div>
  <div class="visitors-background-right index-background">
    <div class="blur-circle-top"></div>
    <div class="blur-circle-bottom hidden-on-tab-and-sp"></div>
    <div class="border-circle-top hidden-on-tab-and-sp"></div>
    <div class="border-circle-bottom hidden-on-tab-and-sp"></div>
  </div>
  <div class="visitors-background-bottom-blur-circle index-background hidden-on-tab-and-sp"></div>
</template>

<style scoped lang="scss">
  .visitors-background-top-left {
    position: absolute;
    top: -3.75vw;
    left: -20vw;

    @include notpc {
      top: 33vw;
      left: -40vw;
    }

    .blur-circle {
      opacity: 0.42;
      position: absolute;
      top: 0;
      left: 3vw;
      width: 50vw;
      height: 50vw;
      border-radius: 50%;
      background-color: $sub1_pale;

      filter: blur(30px);
      @include notpc {
        opacity: 0.2;
        top: 0;
        left: 0;
        width: 90vw;
        height: 90vw;
        background-color: $main2_soft;

        filter: blur(30px);
      }
    }

    .border-circle {
      position: absolute;
      top: 22vw;
      left: 0;
      width: 18vw;
      height: 18vw;
      border: 4px solid rgba($text2_white, 0.78);
      border-radius: 50%;
    }
  }

  .visitors-background-right {
    position: absolute;
    top: 6vw;
    right: -30vw;

    @include notpc {
      top: 90vw;
      right: -17vw;
    }

    .blur-circle-top {
      opacity: 0.12;
      position: absolute;
      top: 0;
      right: 20vw;
      width: 36.5vw;
      height: 36.5vw;
      border-radius: 50%;
      background-color: $main2_soft;

      filter: blur(30px);
      @include notpc {
        opacity: 0.4;
        top: 0;
        right: 0;
        width: 51vw;
        height: 51vw;
        background-color: #99d1af;

        filter: blur(30px);
      }
    }

    .blur-circle-bottom {
      opacity: 0.45;
      position: absolute;
      top: 25vw;
      right: 0;
      width: 48vw;
      height: 48vw;
      border-radius: 50%;
      background-color: $main1_pale;

      filter: blur(30px);
    }

    .border-circle-top {
      position: absolute;
      top: 9vw;
      right: 20vw;
      width: 23.5vw;
      height: 23.5vw;
      border: 4px solid rgba($text2_white, 0.87);
      border-radius: 50%;
    }

    .border-circle-bottom {
      position: absolute;
      top: 25vw;
      right: 22vw;
      width: 31.8vw;
      height: 31.8vw;
      border: 4px solid rgba($text2_white, 0.87);
      border-radius: 50%;
    }
  }
  .visitors-background-bottom-blur-circle {
    opacity: 0.13;
    position: absolute;
    bottom: -25vw;
    left: -25vw;
    width: 51vw;
    height: 51vw;
    border-radius: 50%;
    background-color: $main2_soft;

    filter: blur(30px);
  }
</style>