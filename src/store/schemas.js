const Joi = require('joi-browser');

export const validationSchema = Joi.object()
    .keys({
        list: Joi.array().items(
            Joi.object()
                .keys({
                    dt: Joi.number().required(),
                    main: Joi.object()
                        .keys({
                            temp: Joi.number().required(),
                            pressure: Joi.number().required(),
                            humidity: Joi.number().required(),
                        })
                        .unknown(true),
                    weather: Joi.array().items(
                        Joi.object()
                            .keys({
                                id: Joi.number().required(),
                                description: Joi.string().required(),
                            })
                            .unknown(true),
                    ),
                })
                .unknown(true),
        ),
    })
    .unknown(true);
