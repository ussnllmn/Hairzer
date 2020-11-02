<!--/src/components/Loading.vue-->

<template>
    <div class="Loading">
        <div class="text-center centered text-danger">
            <h1><b-spinner style="width: 10rem; height: 10rem;" label="Large Spinner"></b-spinner></h1>
        </div>
    </div>
</template>

<style scoped>
    .Loading {
        height: 900px;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>