export class Conversion {
    constructor() {
        this.Construct = "this is conversion"
    }

    create() {
        return this.Construct
    }

    // Helper function for formatting number labels with commas
    numberWithCommas(value) {
        value = value || 0
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

}