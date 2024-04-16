"use strict";
/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */
// note that this needs to be a "private" key from STRIPE
const stripe = require("stripe")(
  // Enter your private key for test environment of STRIPE here
  "sk_test_xxxxxxxxxxxxxxx"
);
module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, amount, dishes, token, city, state, error, catchResponse } =
      JSON.parse(ctx.request.body);
    //console.log(token);
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    try {
      const charge = await stripe.charges.create({
        // Transform cents to dollars.
        amount: stripeAmount,
        currency: "usd",
        description: `Order ${new Date()} by ${ctx.state.user._id}`,
        source: token,
      });

      // Register the order in the database
      const order = await strapi.services.order.create({
        user: ctx.state.user.id,
        charge_id: charge.id,
        amount: stripeAmount,
        address,
        dishes,
        city,
        state,
        token,
      });
      return order;
    } catch (error) {
      let catchResponse = {
        code: error.statusCode,
        error: {
          message: error.message,
          code: error.code,
          decline_code: error.decline_code,
          type: error.type,
          statuscode: error.statusCode,
          requestId: error.requestId,
        },
        address,
        amount,
        dishes,
        token,
        city,
        state,
      };
      ctx.response.status = error.statusCode || 500;
      return catchResponse;
    }
  },
};
