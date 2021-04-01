<template>
    <v-simple-table height="400px" fixed-header>
        <thead>
        <tr>
            <th class="text-left" v-for="(item, headerName) in itemsQuotes[0]" :key="item.timestamp">
                {{headerName}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, key) in itemsQuotes" :key="item + key">
            <td class="text-left per" v-for="key in item" :key="key.timestamp">
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
        name: "QuotesList",
        data() {
            return {
                itemsQuotes: [
                    {
                        timestamp: "",
                        open: "",
                        high: "",
                        low: "",
                        close: "",
                        volume: ""
                    }
                ],
                socket: null
            }
        },
        methods: {
            getQuoteItem({timestamp, open, high, low, close, volume}) {
                return {
                    timestamp: new Date(timestamp).toLocaleTimeString(),
                    open,
                    high,
                    low,
                    close,
                    volume
                }
            },
            async fetchData(pair) {
                if (pair) {
                    const data = await makeSimpleRequest(`trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${pair}`);
                    this.itemsQuotes = data.map(item => this.getQuoteItem(item));

                    if (this.socket) {
                        this.socket.close();
                    }
                    this.socket = getConnectedSocket(`tradeBin1m:${pair}`);
                    this.socket.onmessage = (event) => {
                        this.addNewQuoteFromSocket(event.data);
                        this.itemsQuotes.pop();
                    }
                }
            },

            addNewQuoteFromSocket(data) {
                const parsedData = JSON.parse(data);
                if (parsedData && parsedData.data) {
                    this.itemsQuotes.unshift(this.getQuoteItem(parsedData.data[0]));
                }
            },
        },

        created() {
            window.addEventListener(SELECT_PAIR_EVENT, (event) => this.fetchData(event.detail));
        }
    }
</script>

<style scoped>
</style>