import Ember from 'ember';

export default Ember.Component.extend({
    hasSubmitted: false,
    hasError: false,
    store: Ember.inject.service(),
    designId: Ember.computed.alias('designModel.id'),
    validForm: Ember.computed('isDealerCodeValid', 'isCustomerNameValid', function () {
        return (
            this.get('isDealerCodeValid') &&
            this.get('isCustomerNameValid')
        );
    }),
    init(){
        this._super(arguments);
    },
    showInvalidFields(){
        this.set('nameValid', !!this.get('isDealerCodeValid'));
        this.set('emailValid', !!this.get('isCustomerNameValid'));
    },
    saveFormData(){
        var myCountry = this.get('store').all('mycountry').get('firstObject').get('country');
        var myRegion = this.get('store').all('region').filterBy('iso_alpha_2', myCountry).get('firstObject.name');
        if (typeof myRegion === "undefined"){
            logger.warn('Country not found - default to US');
            myRegion = this.get('store').all('region').filterBy('iso_alpha_2', 'US').get('firstObject.name');
        }

        let data = {
            print_request: {
                selector: this.get('design_image_url'),
                design_id: this.get('designId'),
                total_cost: null,
                email: null,
                shipping_details: {
                    name: this.get('customerName'),
                    address_lines: [
                        null,
                        null,
                        null,
                        null,
                        null,
                        myRegion
                    ],
                    city: null,
                    country: myRegion,
                    telephone: null,
                    delivery_estimate: '7-10 Business Days',
                    expedited_shipping: {
                        provider: "An Post",
                        service: "International Track and Trace"
                    }
                },
                shapes: []
            },
            b2b_id: this.get('dealerCode'),
        }
        let self = this;
        Ember.$.ajax({
            type: 'POST',
            url: '/api/print_requests',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json'
        }).then(function (responseData, textStatus, jqXHR) {
            self.set('hasSubmitted', true);
        }, function (jqXHR) {
            self.set('hasError', true);
        });
    },
    actions: {
        closeModal () {
            this.set('modalOpen', false);
        },
        noop () {
        },
        submit () {
            if (this.get('validForm')) {
                this.saveFormData();
            } else {
                this.showInvalidFields();
            }
        }
    }
});
