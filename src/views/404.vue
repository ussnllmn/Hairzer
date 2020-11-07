<!--/src/404.vue-->

<template>
    <div class="PageNotFound">
        <div class="text-center centered">
            <h1><b-icon font-scale="3" variant="danger" icon="exclamation-diamond"></b-icon></h1>
            <h1>ขออภัยไม่พบหน้าที่คุณต้องการ</h1>
            <p>หากพบปัญหาในการใช้งานโปรดติดต่อผู้ดูแลระบบ</p>
        </div>
        
    </div>
</template>

<style scoped>
    .PageNotFound {
        height: 725px;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>