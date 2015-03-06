'use strict';

var joi = require('joi');


/**
 * Validates provided params using the provided schema.
 *
 * @param {Object} params Params to validate.
 * @param {Object} schema Joi schema to use for validation.
 * @return {Object} Validated params.
 * @throws Error if params are invalid.
 */
exports.validateParams = function(params, schema) {
  var validation_result = joi.validate(params,
      schema,
      {
        stripUnknown: true
      });

  if (validation_result.error) {
    throw new Error('Failed to validate params: ' + validation_result.error);
  }

  return validation_result.value;
};
