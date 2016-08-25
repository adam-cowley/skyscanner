export class QuoteSet {

    constructor(Quotes, Places, Carriers, Currencies) {
        this.Quotes = Quotes;
        this.Places = Places;
        this.Carriers = Carriers;
        this.Currencies = Currencies;
    }

    length() {
        return this.Quotes.length;
    }

    row(index) {
        const
            quote = this.Quotes[index];

            const outbound = this.createLeg(quote.OutboundLeg);
            const inbound = this.createLeg(quote.InboundLeg);

            return new Quote(quote.QuoteId, this.Currencies[0], quote.MinPrice, quote.Direct, outbound, inbound)
    }

    createLeg(input) {
        if ( input ) {
            const origin = this.findPlace(input.OriginId);
            const destination = this.findPlace(input.DestinationId);
            const carriers = this.findCarriers(input.CarrierIds);

            return new Leg(input.DepartureDate, origin, destination, carriers);
        }
    }

    findPlace(id) {
        let output;

        this.Places.forEach(place => {
            if ( place.PlaceId == id ) {
                output = place;
            }
        });

        return output;
    }

    findCarriers(input = []) {
        let output = [];

        this.Carriers.forEach(carrier => {
            if ( input.indexOf(carrier.CarrierId) > -1 ) {
                output.push(carrier);
            }
        });

        return output;
    }
}
