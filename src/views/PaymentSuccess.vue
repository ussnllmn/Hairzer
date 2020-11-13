<template>
    <div class="paymentSuccess container">
       <div class="successBox shadow-sm text-center py-5">
            <div class="mt-4">
                <h1>ขอบคุณ!!</h1>    
                <h4>สำหรับการใช้บริการ</h4>
            </div>
            
            <div class="h2 mb-0 mt-5">
                <b-icon icon="check-circle-fill" variant="success" font-scale="3"></b-icon>
            </div>
       </div>

       <div class="text-center p-4">
           <b-button size="lg" variant="outline-primary" @click="$router.push({name: 'Home'})"> กลับหน้าแรก</b-button>
        </div>
    </div>
</template>

<style scoped>
    .paymentSuccess {
        height: 701px;
    }
    .successBox {
        height: 60%;
        border: 1px solid #CED4DA;
        border-radius: 5px;
        color: #495057;
    }
</style>