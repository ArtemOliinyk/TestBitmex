<template>
    <v-simple-table height="400px" fixed-header>
        <thead>
        <tr>
            <th class="text-left" v-for="(item, headerName) in itemsPair[0]" :key="item">
                {{headerName}}
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="item in itemsPair" :key="item.pair" @click="choosePair(item.pair)" class="pair">
                <td class="text-left" id={key} ref="pair" v-for="key in item" :key="key">
                    {{ key }}
                </td>
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    import {SELECT_PAIR_EVENT} from '../Events';
    import {makeSimpleRequest} from "../RequestHelper";
    import {getConnectedSocket} from "../Socket";

    export default {
        name: "PairsList",
        data() {
            return {
                itemsPair: [],
            }
        },
        methods: {
            choosePair(name) {
                const event = new CustomEvent(SELECT_PAIR_EVENT, {detail: name});
                window.dispatchEvent(event);
            },
            updatePairPrice(data) {
                const jsonData = JSON.parse(data).data;
                if (jsonData) {
                    const newItem = jsonData[0];
                    const updatedPair = this.itemsPair.find(item => item.pair === newItem.symbol);
                    if (updatedPair && newItem.markPrice) {
                        this.$set(updatedPair, 'price', newItem.markPrice);
                    }
                }
            },
        },
        created() {
            let socket = getConnectedSocket("instrument");
            socket.onmessage = (event) => this.updatePairPrice(event.data);
        },
        async mounted() {
            const data = await makeSimpleRequest("instrument/active");
            data.forEach(item => {
                this.itemsPair.push({
                    pair: item.symbol,
                    price: item.lastPrice
                })
            })
        }
    }
</script>

<style scoped>
    .pair {
        cursor: pointer;
    }
</style>