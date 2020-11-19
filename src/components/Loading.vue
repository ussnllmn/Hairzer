<!--/src/components/Loading.vue-->

<template>
    <div class="Loading">
        <div class="text-center centered text-success">
            <h1><b-spinner style="width: 10rem; height: 10rem;" label="Large Spinner"></b-spinner></h1>
        </div>
    </div>
</template>

<style scoped>
    .Loading {
        position:absolute;
        background-color: rgba(255, 255, 255, 0.8);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 100;
    }
    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>