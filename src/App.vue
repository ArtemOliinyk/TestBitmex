<template>
    <v-app>
        <div id="app">
            <v-container>
                <v-row>
                    <v-col class="pl-0">
                        <v-card class="pa-4">
                            <PairsList/>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card class="pa-4">
                            <QuotesList/>
                        </v-card>
                    </v-col>
                    <v-col class="d-flex align-center justify-center pr-0">
                        <OrderForm/>
                    </v-col>
                </v-row>
                <v-row class="d-block py-4" >
                    <v-card class="pa-4">
                        <History/>
                    </v-card>
                </v-row>
            </v-container>
        </div>
    </v-app>
</template>

<script>
    import PairsList from './components/PairsList';
    import QuotesList from './components/QuotesList';
    import OrderForm from './components/OrderForm';
    import History from './components/History';

    export default {
        name: 'App',
        components: {
            PairsList,
            QuotesList,
            OrderForm,
            History
        },
        data() {
            return {}
        },
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        overflow: auto;
    }
</style>
