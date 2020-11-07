<template>
    <div class="PaymentSuccess">
       <div class="text-center p-4 m-4" style="border:1px solid black;" >
            <h1>
                ขอบคุณ!!
            </h1>    
            
            <h4>
            สำหรับการใช้บริการ
            </h4>

            <div class="h2 mb-0">
                <b-icon icon="check-circle-fill" variant="success" font-scale="3"></b-icon>
                
            </div>
       </div>

       <div class="text-center p-4 "><b-button size="lg" variant="outline-primary" @click="$router.push({name: 'Home'})"> Back </b-button></div>
    </div>
</template>

<style scoped>

</style>