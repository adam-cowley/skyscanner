
const Skyscanner = require('./lib/Skyscanner')('YOUR_API_KET');


const originPlace = 'LOND-sky';
const destinationPlace = 'IT-sky'
const outboundPartialDate = '2016-10';
const inboundPartialDate = '2016-10';

service.autosuggest('Napoli')
    .then(suggestions => {
        return suggestions[0].PlaceId;
    })
    .then(destinationPlace => {
        return service.browsequotes(originPlace, destinationPlace, outboundPartialDate, inboundPartialDate)
    })
    .then(res => {
        console.log(res.length());

        let lowest;

        for (let i = 0; i < res.length(); i++) {
            const result = res.row(i);

            if (result.OutboundLeg && result.InboundLeg) {
                if ( result.Direct ) {
                    // console.log();
                    // console.log();
                    // console.log(
                    //     wrap(result.OutboundLeg.DepartureDate, 10),
                    //     '-',
                    //     wrap(result.InboundLeg.DepartureDate, 10),
                    //     wrap(result.Currency.Symbol,1),
                    //     wrap(result.MinPrice, 3)
                    // )

                    // console.log(
                    //     wrap(result.OutboundLeg.DepartureDate, 10),
                    //     wrap(result.OutboundLeg.Origin.Name, 25),
                    //     '->',
                    //     wrap(result.OutboundLeg.Destination.Name, 25)
                    // )

                    // console.log(
                    //     wrap(result.InboundLeg.DepartureDate, 10),
                    //     wrap(result.InboundLeg.Origin.Name, 25),
                    //     '<-',
                    //     wrap(result.InboundLeg.Destination.Name, 25)
                    // )

                    if (!lowest || lowest.MinPrice > result.MinPrice) {
                        lowest = result;
                    }
                }
            }
        }

        console.log();
        console.log();
        console.log('Lowest!');

        console.log(
            wrap(lowest.OutboundLeg.DepartureDate, 10),
            '-',
            wrap(lowest.InboundLeg.DepartureDate, 10),
            wrap(lowest.Currency.Symbol,1),
            wrap(lowest.MinPrice, 3)
        )

        console.log(
            wrap(lowest.OutboundLeg.DepartureDate, 10),
            wrap(lowest.OutboundLeg.Origin.Name, 25),
            '->',
            wrap(lowest.OutboundLeg.Destination.Name, 25)
        )

        console.log(
            wrap(lowest.InboundLeg.DepartureDate, 10),
            wrap(lowest.InboundLeg.Origin.Name, 25),
            '<-',
            wrap(lowest.InboundLeg.Destination.Name, 25)
        )

        const ref_url = service.referral(lowest.OutboundLeg.Origin.SkyscannerCode, lowest.OutboundLeg.Destination.SkyscannerCode, lowest.OutboundLeg.DepartureDate, lowest.InboundLeg.DepartureDate)

        console.log('Referral URL', ref_url);

    })

.catch(e => {
    console.log(e);
    console.log(e.stack)
})



function wrap(input, len = 30) {
    input += ' '.repeat(len);
    return input.substr(0, len);
}