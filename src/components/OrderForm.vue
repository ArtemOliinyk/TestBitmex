<template>
    <div>
        <v-form ref="form" lazy-validation>
            <v-text-field type="number" v-model="amount" :rules="amountRules" label="Amount" required>
            </v-text-field>
            <v-btn color="success" class="mr-4" @click="makeOrder('Buy')">
                Buy
            </v-btn>
            <v-btn color="error" class="mr-4" @click="makeOrder('Sell')">
                Sell
            </v-btn>
        </v-form>
        <v-snackbar v-model="snackbar">
            {{ textSnackBar }}
            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import {makeRequestAuth} from "../RequestHelper";
    import {SELECT_PAIR_EVENT} from "../Events";

    export default {
        name: "OrderForm",
        data() {
            return {
                amount: 1,
                amountRules: [
                    v => !!v || 'Amount is required',
                    v => v > 0 || 'Amount must be higher than 0',
                ],
                selectedPair: "",
                snackbar: false,
                textSnackBar: "",
            }
        },
        methods: {
            async makeOrder(type) {
                this.$refs.form.validate();
                if (this.amount > 0) {
                    const requestData = {
                        ordType: "Market",
                        symbol: this.selectedPair,
                        orderQty: this.amount,
                        side: type
                    };
                    const response = await makeRequestAuth("order", "POST", JSON.stringify(requestData));
                    this.textSnackBar = response.error.message;
                    this.snackbar = true;
                }
            }
        },
        created() {
            window.addEventListener(SELECT_PAIR_EVENT, (event) => {
                this.selectedPair = event.detail;
            });
        }
    }
</script>

<style scoped>

</style>