/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
   const stripe = Stripe('pk_test_51GzSdvJvUmlagAgPA3mSf1d6K8rBoUD6ZUsUHrMUk8nl8Bh2ulZxh0dq4WoGpQvA9inyO6lRG1SL0IgRoH3i0CYR00l5p361Ac');
   try {
       // 1) Get checkout session from API
       const session = await axios(
         `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
       );

       // 2) Create checkout form + charge credit card
       await stripe.redirectToCheckout({
          sessionId: session.data.session.id
       });
   } catch(err) {
       //console.log(err);
       showAlert('error', err);
   }
};