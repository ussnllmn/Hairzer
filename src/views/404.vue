<!--/src/404.vue-->

<template>
    <div class="PageNotFound">
        <div class="text-center centered text-danger">
            <h1><b-spinner style="width: 4rem; height: 4rem;" label="Large Spinner"></b-spinner></h1>
            <h1>Error 404 Not Found</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quaerat, natus quis beatae dolorem aliquam delectus a suscipit ullam provident officia laborum repudiandae, dolore quae. Reiciendis temporibus itaque similique deserunt.</p>
        </div>
        
    </div>
</template>

<style scoped>
    .PageNotFound {
        height: 900px;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>