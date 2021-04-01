<template>
    <v-simple-table height="400px" fixed-header>
        <thead>
        <tr>
            <th class="text-left" v-for="(item, headerName) in itemsHistory[0]" :key="item.timestamp">
                {{headerName}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, key) in itemsHistory" :key="item + key">
            <td class="text-left" v-for="key in item" :key="key.timestamp">
                {{ key }}
            </td>
        </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    import {makeRequestAuth} from "../RequestHelper";

    export default {
        name: "History",
        data() {
            return {
                itemsHistory: [],
            }
        },

        async mounted() {
            const data = await makeRequestAuth("order", "GET");
            data.forEach(({timestamp, orderID, symbol, orderQty, side, price, ordStatus}) => {
                this.itemsHistory.push({
                    timestamp: new Date(timestamp).toLocaleTimeString(),
                    orderID,
                    symbol,
                    orderQty,
                    side,
                    price,
                    ordStatus,
                })
            });
        }
    }
</script>

<style scoped>

</style>